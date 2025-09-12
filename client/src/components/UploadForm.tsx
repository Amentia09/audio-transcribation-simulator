import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Upload, message } from "antd";
import { useMutation } from "@apollo/client/react";
import { CREATE_UPLOAD_JOB } from "../graphql/upload_requests";
import { GET_JOBS } from "../graphql/jobs_requests";
import { logger } from "../utils/logger";

import type { CreateUploadJobResponse, CreateUploadJobVars } from "../interfaces/interfaces";

const UploadForm: React.FC = () => {
  const [loading, setLoading] = useState(false);


  const [createUploadJob] = useMutation<CreateUploadJobResponse, CreateUploadJobVars>(CREATE_UPLOAD_JOB, {
    refetchQueries: [{ query: GET_JOBS }],
  });

  const beforeUpload = (file: File) => {
    logger.info('Проверка файла перед загрузкой', {
      component: 'UploadForm',
      action: 'before_upload',
      filename: file.name,
      fileSize: file.size,
      mimeType: file.type
    });

    if (!file.type.startsWith("audio/")) {
      logger.warn('Попытка загрузки неаудио файла', {
        component: 'UploadForm',
        action: 'file_validation_failed',
        filename: file.name,
        mimeType: file.type
      });
      message.error("Можно загружать только аудиофайлы!");
      return Upload.LIST_IGNORE;
    }

    logger.info('Файл прошел валидацию', {
      component: 'UploadForm',
      action: 'file_validation_success',
      filename: file.name
    });
    return true;
  };

  const handleCustomUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    setLoading(true);

    
    logger.uploadStart(file.name, file.size, file.type);

    try {
      
      logger.info('Создание задачи загрузки', {
        component: 'UploadForm',
        action: 'create_upload_job',
        filename: file.name,
        variables: {
          filename: file.name,
          mime: file.type,
          size: file.size
        }
      });

      const { data } = await createUploadJob({
        variables: {
          filename: file.name,
          mime: file.type,
          size: file.size,
        },
      });

      if (!data?.createUploadJob) {
        const error = new Error("Failed to create upload job - no data returned");
        logger.uploadError(file.name, error, {
          action: 'create_upload_job_failed',
          reason: 'no_data_returned'
        });
        throw error;
      }

      const { uploadUrl, job } = data.createUploadJob;

      logger.info('Задача загрузки создана успешно', {
        component: 'UploadForm',
        action: 'upload_job_created',
        filename: file.name,
        jobId: job.id,
        uploadUrl: uploadUrl
      });

      
      logger.info('Начало загрузки файла в MinIO', {
        component: 'UploadForm',
        action: 'minio_upload_start',
        filename: file.name,
        uploadUrl: uploadUrl
      });

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          'Content-Type': file.type,
        },
        body: file
      });

      if (!uploadResponse.ok) {
        const error = new Error(`MinIO upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
        logger.uploadError(file.name, error, {
          action: 'minio_upload_failed',
          status: uploadResponse.status,
          statusText: uploadResponse.statusText,
          uploadUrl: uploadUrl
        });
        throw error;
      }

      logger.uploadSuccess(file.name, job.id, uploadUrl);

      //В новой версии статичный message не поддерживается. Поэтому был использован Alert в качестве вывода сообщений
      alert(`Файл "${job.name}" успешно загружен!`);
      onSuccess(null, file);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      // Логи для отладки 
      logger.uploadError(file.name, error, {
        action: 'upload_process_failed',
        errorType: error.constructor.name,
        errorMessage: error.message,
        stack: error.stack
      });

      console.error("Ошибка при загрузке:", err);
      alert("Ошибка загрузки файла");
      onError(err);
    } finally {
      setLoading(false);
      logger.info('Процесс загрузки завершен', {
        component: 'UploadForm',
        action: 'upload_process_completed',
        filename: file.name
      });
    }
  };

  return (
    <Space
      align="center"
      direction="vertical"
      size="middle"
      style={{ display: "flex", margin: "10px" }}
    >
      <Upload
        name="audio"
        accept="audio/*,.mp3,.wav,.m4a,.ogg"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={handleCustomUpload} 
        style={{ minWidth: "500px" }}
      >
        <button style={{ border: 0, background: "none" }} type="button">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
    </Space>
  );
};

export default UploadForm;
