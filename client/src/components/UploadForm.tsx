import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Space, Upload } from 'antd';


    // message в данной версии не поддерживает статический вывод, позже постараюсь решить эту проблему через него
  const beforeUpload = (file: any) => {
      file.type === 'audio/mpeg' ? '' : alert('You can only upload audio file!');
      return true;
  }

  const handleAction = (file: any) => {
    console.log('action -> file:', file);           
    return 'https://example.com/upload';       
  }


 const handleChange = ({ file, fileList, event }: any) => {
    console.log('onChange -> file:', file);        
    // console.log('onChange -> origin:', file.originFileObj); 

  }


const UploadForm: React.FC = () => {
  const [loading, setLoading] = useState(false); 


  return (
    <Space  align="center" direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
      <Upload
        name="audio"
        accept="audio/*,.mp3,.wav,.m4a,.ogg"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={handleAction}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        style={{ minWidth: '500px' }}
      >
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
      </Upload>
    </Space>
  );
};

export default UploadForm;