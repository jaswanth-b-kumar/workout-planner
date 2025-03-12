import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormComponent from './Components/FormComponent';
import TableComponent from './Components/TableComponent';
import EmptyState from './Components/EmptyState';
import WorkoutStats from './Components/WorkoutStats';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DownloadComponent from './Components/DownloadComponent';

function App() {
  const workouts = useSelector((state) => state.workouts.workouts);

  return (
    <div className="app">
      <Container fluid className="p-3 p-md-4 h-100">
        <Row className="h-100">
          {/* Form Column (30%) */}
          <Col sm={12} md={4} className="form-col">
            <div className="form-wrapper mb-4">
              <FormComponent />
            </div>
            
            <div className="stats-wrapper">
              <WorkoutStats />
              
              {workouts.length > 0 && (
                <div className="download-wrapper mt-3">
                  <PDFDownloadLink 
                    document={<DownloadComponent workouts={workouts} />} 
                    fileName="my-workout-plan.pdf"
                    className="btn btn-primary w-100"
                  >
                    {({ loading }) => 
                      loading ? 'Preparing download...' : 'Download Workout Plan (PDF)'
                    }
                  </PDFDownloadLink>
                </div>
              )}
            </div>
          </Col>
          
          {/* Table Column (70%) */}
          <Col sm={12} md={8} className="table-col">
            {workouts.length > 0 ? (
              <TableComponent />
            ) : (
              <EmptyState />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;