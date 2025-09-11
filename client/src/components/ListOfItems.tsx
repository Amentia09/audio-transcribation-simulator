import React from 'react'
import { Space, Card, Tag, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import type { Job } from '../interfaces/interfaces'


const ListOfItems: React.FC<{jobs: Array<Job>}> = ({jobs}) => {

    const colorTag = (status: string) => {
        if (status === 'COMPLETED') return 'green'
        if (status === 'PROCESSING') return 'yellow'
        if (status === 'FAILED') return 'red'
        return 'blue'
    }
  return (
    <Space  align="center" direction="vertical" size="middle" style={{ display: 'flex', margin: '20px' }}>
        {jobs.map((job, index) => (
            <Card 
            key={index} 
            title={job.name} 
            size="small" 
            style={{ minWidth: '300px', maxWidth: '600px' }}
            extra={
            <Tag color={colorTag(job.status)}>{job.status}</Tag>
            }
            >
                { (job.status === 'PROCESSING') ? <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> : <p>{job.transcriptionText}</p> }
                {/* <p>{job.transcriptionText}</p> */}
            </Card>
        ))}
    </Space>
  )
}

export default ListOfItems