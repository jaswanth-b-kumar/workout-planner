import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import FormComponent from './Components/FormComponent';
import TableComponent from './Components/TableComponent';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">
      <Container fluid="xxl" className='p-4 p-md-5 h-100'>
        <Row className='align-items-stretch mx-xxl-5 p-md-3 h-100 homepage-container'>
          <Col sm={12} lg={3} className='p-3'>
            <FormComponent />
          </Col>
          <Col sm={12} md={9} className='p-3 h-100 d-flex flex-column align-items-center'>
            <TableComponent editModal={handleShow}/>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
