import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormComponent from './Components/FormComponent';
import TableComponent from './Components/TableComponent';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <FormComponent />
          </Col>
          <Col>
            <TableComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
