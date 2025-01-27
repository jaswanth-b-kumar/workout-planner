import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import FormComponent from './Components/FormComponent';
import TableComponent from './Components/TableComponent';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container fluid="xxl" className='p-4 p-md-5 h-100'>
        <Row className='align-items-stretch mx-xxl-5 h-100 homepage-container'>
          <Col sm={12} md={4} lg={3} className='p-3 form-container'>
            <FormComponent />
          </Col>
          <Col sm={12} md={8} lg={9} className='p-0 h-100 d-flex flex-column align-items-center table-background'>
            <TableComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
