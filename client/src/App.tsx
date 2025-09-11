import { useEffect, useState } from 'react'
import UploadForm from './components/UploadForm'
import { Layout, Typography, Spin  } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
const { Header, Footer, Content  } = Layout;
const { Title } = Typography;

import ListOfItems from './components/ListOfItems'
import type { Job } from './interfaces/interfaces'

import { GET_JOBS } from './graphql/jobs_requests'
import { useQuery } from '@apollo/client/react'


const headerStyled: React.CSSProperties = {
  margin: 0,
  padding: '10px',
  textAlign: 'center',
  color: 'white',
  alignItems: 'center',
  backgroundColor: 'rgb(48, 66, 116)',
};
const footerStyled: React.CSSProperties = {
  margin: 0,
  position: 'fixed',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'gray',
};


function App() {
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<boolean>(false);

  const { data, loading, error } = useQuery<{ jobs: Job[] }>(GET_JOBS, {
    pollInterval: 16000,
  });

  useEffect(() => {
    if (loading) {
      setLoadingList(true);
    } else {
      setLoadingList(false);
    }

    if (error) {
      setErrorList(true);
    } else {
      setErrorList(false);
    }
    console.log(jobs);
  }, [loading, error]);

  const jobs: Job[] = data?.jobs ?? [];



  return (
    <>
      <Header style={headerStyled}>
        <Title  
          level={2}
          style={{ color: 'white', margin: 0 }}
        >
          Транскрибация аудио
          </Title >        
        </Header>

        <Content>
          {loadingList ? <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> : <ListOfItems jobs={jobs} />}
          {errorList ? <p>Ошибка: {error?.message}</p> : null}
          {/* <ListOfItems /> */}
          <UploadForm />
        </Content>

      <Footer style={footerStyled}>
        Контакт для связи: anna.simi.007@gmail.com
      </Footer>
    </>
  )
}

export default App
