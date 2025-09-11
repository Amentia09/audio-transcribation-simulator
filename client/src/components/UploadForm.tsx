import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Upload, message } from "antd";
import { useMutation } from "@apollo/client/react";
import { CREATE_UPLOAD_JOB } from "../graphql/upload_requests";
import { GET_JOBS } from "../graphql/jobs_requests";


import type { CreateUploadJobResponse, CreateUploadJobVars } from "../interfaces/interfaces";

const UploadForm: React.FC = () => {
  const [loading, setLoading] = useState(false);


  const [createUploadJob] = useMutation<CreateUploadJobResponse, CreateUploadJobVars>(CREATE_UPLOAD_JOB, {
    refetchQueries: [{ query: GET_JOBS }],
  });

  const beforeUpload = (file: File) => {
    if (!file.type.startsWith("audio/")) {
      message.error("Можно загружать только аудиофайлы!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleCustomUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    setLoading(true);

    try {
      const { data } = await createUploadJob({
        variables: {
          filename: file.name,
          mime: file.type,
          size: file.size,
        },
      });

      if (!data?.createUploadJob) {
        throw new Error("Failed to create upload job");
      }

      const { uploadUrl, job } = data.createUploadJob;

      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });


      //В новой версии статичный message не поддерживается. Поэтому был использован Alert в качестве вывода сообщений
      alert(`Файл "${job.name}" успешно загружен!`);
      onSuccess(null, file);
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
      alert("Ошибка загрузки файла");
      onError(err);
    } finally {
      setLoading(false);
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
