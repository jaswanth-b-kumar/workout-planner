import React, { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addWorkout, deleteWorkout } from '../Redux/workoutSlice';

function CustomWorkoutForm({ workout = null, onSave }) {
  const [formValues, setFormValues] = useState({
    muscle: '',
    workout: '',
    workoutSets: '',
    workoutRepetitions: '',
    workoutLink: ''
  });
  
  const dispatch = useDispatch();
  
  // If editing, pre-populate form
  useEffect(() => {
    if (workout) {
      setFormValues({
        muscle: workout.muscle,
        workout: workout.workout,
        workoutSets: workout.workoutSets,
        workoutRepetitions: workout.workoutRepetitions,
        workoutLink: workout.workoutLink || ''
      });
    }
  }, [workout]);
  
  const handleFormChange = (event) => {
    setFormValues((prev) => ({ 
      ...prev, 
      [event.target.id]: event.target.value 
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate unique ID for new workouts
    const uid = function() {
      return Date.now().toString(36) + Math.random().toString(36);
    };
    
    if (workout) {
      // Editing existing workout - remove old one and add updated version
      dispatch(deleteWorkout({payload: workout.id }));
      dispatch(addWorkout({
        payload: {
          ...formValues,
          id: workout.id // Keep the same ID
        }
      }));
    } else {
      // Adding new custom workout
      dispatch(addWorkout({ 
        payload: {
          ...formValues,
          id: uid() // Generate new ID
        }
      }));
    }
    
    // Reset form and close
    setFormValues({
      muscle: '',
      workout: '',
      workoutSets: '',
      workoutRepetitions: '',
      workoutLink: ''
    });
    
    if (onSave) onSave();
  };
  
  // Common muscle groups for selection
  const muscleGroups = [
    'chest', 'back', 'shoulders', 'biceps', 'triceps',
    'quadriceps', 'hamstrings', 'calves', 'abdominals',
    'forearms', 'traps', 'glutes'
  ];
  
  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="muscle" label="Target Muscle" className="mb-3">
        <Form.Select 
          required
          value={formValues.muscle}
          onChange={handleFormChange}
        >
          <option value="">Select muscle group</option>
          {muscleGroups.map((muscle, index) => (
            <option key={index} value={muscle}>
              {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
            </option>
          ))}
          <option value="other">Other (Custom)</option>
        </Form.Select>
      </FloatingLabel>
      
      {formValues.muscle === 'other' && (
        <FloatingLabel controlId="customMuscle" label="Custom Muscle Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter muscle group name"
            value={formValues.customMuscle || ''}
            onChange={(e) => setFormValues(prev => ({ 
              ...prev, 
              customMuscle: e.target.value,
              muscle: e.target.value // Also update the actual muscle field
            }))}
            required
          />
        </FloatingLabel>
      )}
      
      <FloatingLabel controlId="workout" label="Exercise Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter exercise name"
          value={formValues.workout}
          onChange={handleFormChange}
          required
        />
      </FloatingLabel>
      
      <FloatingLabel controlId="workoutSets" label="Number of Sets" className="mb-3">
        <Form.Control
          type="number"
          min="1"
          max="20"
          placeholder="Enter number of sets"
          value={formValues.workoutSets}
          onChange={handleFormChange}
          required
        />
      </FloatingLabel>
      
      <FloatingLabel controlId="workoutRepetitions" label="Repetitions per Set" className="mb-3">
        <Form.Control
          type="number"
          min="1"
          max="100"
          placeholder="Enter repetitions per set"
          value={formValues.workoutRepetitions}
          onChange={handleFormChange}
          required
        />
      </FloatingLabel>
      
      <FloatingLabel controlId="workoutLink" label="Demonstration URL (Optional)" className="mb-3">
        <Form.Control
          type="url"
          placeholder="https://example.com/workout-demo"
          value={formValues.workoutLink}
          onChange={handleFormChange}
        />
        <Form.Text className="text-muted">
          Add a link to a video or guide demonstrating this exercise
        </Form.Text>
      </FloatingLabel>
      
      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onSave}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {workout ? 'Update Exercise' : 'Add to Plan'}
        </Button>
      </div>
    </Form>
  );
}

export default CustomWorkoutForm;