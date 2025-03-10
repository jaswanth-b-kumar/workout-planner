import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { 
  MuscleIcon, 
  WorkoutIcon, 
  RepetitionIcon, 
  PlusCircleFill, 
  Arrow90degDown, 
  FileEarmarkArrowDown 
} from 'react-bootstrap-icons';

// Sample workout templates
const workoutTemplates = [
  {
    name: "Upper Body Focus",
    exercises: [
      { muscle: "chest", workout: "Bench Press", workoutSets: 3, workoutRepetitions: 10 },
      { muscle: "back", workout: "Pull-ups", workoutSets: 3, workoutRepetitions: 8 },
      { muscle: "shoulders", workout: "Shoulder Press", workoutSets: 3, workoutRepetitions: 12 }
    ]
  },
  {
    name: "Lower Body Power",
    exercises: [
      { muscle: "quadriceps", workout: "Squats", workoutSets: 4, workoutRepetitions: 8 },
      { muscle: "hamstrings", workout: "Deadlifts", workoutSets: 3, workoutRepetitions: 10 },
      { muscle: "calves", workout: "Calf Raises", workoutSets: 3, workoutRepetitions: 15 }
    ]
  },
  {
    name: "Full Body Beginner",
    exercises: [
      { muscle: "chest", workout: "Push-ups", workoutSets: 3, workoutRepetitions: 8 },
      { muscle: "quadriceps", workout: "Bodyweight Squats", workoutSets: 3, workoutRepetitions: 12 },
      { muscle: "back", workout: "Dumbbell Rows", workoutSets: 3, workoutRepetitions: 10 }
    ]
  }
];

function WelcomeContent({ onLoadTemplate }) {
  return (
    <div className="welcome-container text-center p-4">
      <h2 className="mb-4">Build Your Perfect Workout Plan</h2>
      
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="steps-container text-start">
                <h4 className="mb-3">Getting Started:</h4>
                
                <div className="step d-flex align-items-center mb-3">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>Select Target Muscle</strong>
                    <p className="text-muted mb-0">Choose which muscle group you want to work on</p>
                  </div>
                </div>
                
                <div className="step d-flex align-items-center mb-3">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>Choose Workout</strong>
                    <p className="text-muted mb-0">Pick from exercises available for that muscle</p>
                  </div>
                </div>
                
                <div className="step d-flex align-items-center mb-3">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>Set Your Volume</strong>
                    <p className="text-muted mb-0">Enter sets and reps for the exercise</p>
                  </div>
                </div>
                
                <div className="step d-flex align-items-center mb-3">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <strong>Add to Plan</strong>
                    <p className="text-muted mb-0">Click "Add Workout" to include it in your plan</p>
                  </div>
                </div>
                
                <div className="step d-flex align-items-center">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <strong>Download & Go</strong>
                    <p className="text-muted mb-0">Save your plan as a PDF to use at the gym</p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col md={6} className="p-4">
              <div className="workflow-diagram">
                {/* This could be a diagram or animation showing the process */}
                <div className="text-center">
                  <img 
                    src="/path/to/workflow-image.svg" 
                    alt="Workout Plan Workflow" 
                    className="img-fluid"
                    style={{ maxHeight: "300px" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <h4 className="mb-3">Start with a Template</h4>
      <p className="text-muted mb-4">Don't know where to begin? Try one of these pre-made plans</p>
      
      <Row className="mb-4">
        {workoutTemplates.map((template, index) => (
          <Col md={4} key={index} className="mb-3">
            <Card className="h-100 template-card">
              <Card.Body>
                <Card.Title>{template.name}</Card.Title>
                <ul className="text-start ps-3">
                  {template.exercises.map((exercise, i) => (
                    <li key={i}>
                      {exercise.workout}: {exercise.workoutSets} x {exercise.workoutRepetitions}
                    </li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer>
                <Button 
                  variant="outline-primary" 
                  className="w-100"
                  onClick={() => onLoadTemplate(template)}
                >
                  Use This Template
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="primary" size="lg">
          Create Your Own Plan
          <PlusCircleFill className="ms-2" />
        </Button>
      </div>
    </div>
  );
}

export default WelcomeContent;