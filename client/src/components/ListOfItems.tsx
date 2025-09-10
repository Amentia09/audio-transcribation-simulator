import { Space, List, Card, Tag } from 'antd'
import React from 'react'

const mockData = [
  {
    id: 1,
    name: '1 song',
    status: 'COMPLETED',
    content: 'Text of transcribation'
  },
  {
    id: 2,
    name: '2 song',
    status: 'ERROR',
    content: '-'
  },
  {
    id: 3,
    name: '3 song',
    status: 'PROCESSING',
    content: '-'
  }
]


const ListOfItems: React.FC = () => {

    const colorTag = (status: string) => {
        if (status === 'COMPLETED') return 'green'
        if (status === 'PROCESSING') return 'yellow'
        if (status === 'ERROR') return 'red'
        return 'blue'
    }
  return (
    <Space  align="center" direction="vertical" size="middle" style={{ display: 'flex', margin: '20px' }}>
        {mockData.map((job, index) => (
            <Card 
            key={index} 
            title={job.name} 
            size="small" 
            style={{ minWidth: '300px', maxWidth: '600px' }}
            extra={
            <Tag color={colorTag(job.status)}>{job.status}</Tag>
            }
            >
                <p>{job.content}</p>
            </Card>
        ))}
    </Space>
  )
}

export default ListOfItems