import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormComponent from './Components/FormComponent';
import TableComponent from './Components/TableComponent';
import WorkoutStats from './Components/WorkoutStats';
import WelcomeContent from './Components/WelcomeContent';
import EmptyTable from './Components/EmptyTable';
import { Col, Container, Row, Modal } from 'react-bootstrap';
import CustomWorkoutForm from './Components/CustomWorkoutForm';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DownloadComponent from './Components/DownloadComponent';


function App() {
  const workouts = useSelector((state) => state.workouts.workouts);
  const [hasAddedBefore, setHasAddedBefore] = useState(false);
  const [showTemplates, setShowTemplates] = useState(true);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [editWorkout, setEditWorkout] = useState(null);
  const [planTitle, setPlanTitle] = useState("My Workout Plan");
  
  // Track if user has added workouts before
  useEffect(() => {
    if (workouts.length > 0) {
      setHasAddedBefore(true);
      setShowTemplates(false);
    }
  }, [workouts.length]);

  // Handler for template selection
  const handleLoadTemplate = (template) => {
    // Logic to load template workouts
    setShowTemplates(false);
  };

  // Handler for editing workouts
  const handleEditWorkout = (workout) => {
    setEditWorkout(workout);
    setShowCustomModal(true);
  };

  // Handler for custom workout modal
  const handleCustomWorkout = () => {
    setEditWorkout(null);
    setShowCustomModal(true);
  };

  return (
    <div className="App">
      <Container fluid="xxl" className="p-4 p-md-5 h-100">
        <Row className="align-items-stretch mx-xxl-5 h-100 homepage-container">
          {/* Left Column - Form and Stats */}
          <Col sm={12} md={4} lg={3} className="form-column">
            <div className="form-container p-3 mb-3">
              <FormComponent onCustomize={handleCustomWorkout} />
            </div>
            
            {/* Stats Component in the previously empty 30-40% space */}
            <div className="stats-container px-3">
              <WorkoutStats />
              
              {/* Optional: Plan title editor */}
              {workouts.length > 0 && (
                <div className="plan-title-container mt-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    value={planTitle}
                    onChange={(e) => setPlanTitle(e.target.value)}
                    placeholder="Name your workout plan" 
                  />
                </div>
              )}
              
              {/* PDF Download button moved here for better visibility */}
              {workouts.length > 0 && (
                <PDFDownloadLink
                  document={<DownloadComponent workouts={workouts} title={planTitle} />}
                  fileName={`${planTitle.replace(/\s+/g, '-').toLowerCase()}.pdf`}
                  className="btn btn-success w-100 mt-3"
                >
                  {({ loading }) => 
                    loading ? 'Preparing document...' : 'Download Workout Plan'
                  }
                </PDFDownloadLink>
              )}
            </div>
          </Col>
          
          {/* Right Column - Table or Welcome Content */}
          <Col sm={12} md={8} lg={9} className="p-0 h-100 d-flex flex-column align-items-center table-background">
            {workouts.length > 0 ? (
              <TableComponent onEditWorkout={handleEditWorkout} />
            ) : (
              showTemplates ? (
                <WelcomeContent onLoadTemplate={handleLoadTemplate} />
              ) : (
                <EmptyTable 
                  hasAddedBefore={hasAddedBefore} 
                  onShowTemplates={() => setShowTemplates(true)} 
                />
              )
            )}
          </Col>
        </Row>
      </Container>
      
      {/* Custom Workout Modal */}
      <Modal show={showCustomModal} onHide={() => setShowCustomModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editWorkout ? 'Edit Workout' : 'Customize Workout'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomWorkoutForm 
            workout={editWorkout} 
            onSave={() => setShowCustomModal(false)} 
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;