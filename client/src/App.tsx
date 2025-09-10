import UploadForm from './components/UploadForm'
import { Layout, Typography  } from 'antd'
import ListOfItems from './components/ListOfItems'
const { Header, Footer, Content  } = Layout;
const { Title } = Typography;


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
          <ListOfItems />
          <UploadForm />
        </Content>

      <Footer style={footerStyled}>
        Контакт для связи: anna.simi.007@gmail.com
      </Footer>
    </>
  )
}

export default App
