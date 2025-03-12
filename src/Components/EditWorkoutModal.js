import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteWorkout, addWorkout } from '../Redux/workoutSlice';

function EditWorkoutModal({ show, workout, onHide }) {
    const [formValues, setFormValues] = useState({
        muscle: '',
        workout: '',
        workoutSets: '',
        workoutRepetitions: '',
        workoutLink: ''
    });
    
    const dispatch = useDispatch();
    
    // Update form values when workout changes
    useEffect(() => {
        if (workout) {
            setFormValues({
                muscle: workout.muscle || '',
                workout: workout.workout || '',
                workoutSets: workout.workoutSets || '',
                workoutRepetitions: workout.workoutRepetitions || '',
                workoutLink: workout.workoutLink || ''
            });
        }
    }, [workout]);
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Remove the old workout
        dispatch(deleteWorkout({ payload: workout.id }));
        
        // Add the updated workout with the same ID
        dispatch(addWorkout({ 
            payload: {
                ...formValues,
                id: workout.id  // Keep the same ID
            }
        }));
        
        // Close the modal
        onHide();
    };
    
    // Reset form when modal closes
    const handleClose = () => {
        setFormValues({
            muscle: '',
            workout: '',
            workoutSets: '',
            workoutRepetitions: '',
            workoutLink: ''
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Edit Exercise</Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <FloatingLabel
                        controlId="muscle"
                        label="Muscle Group"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Muscle Group"
                            value={formValues.muscle}
                            onChange={handleInputChange}
                            readOnly  // Not allowing muscle change to prevent inconsistency
                            className="bg-light"
                        />
                    </FloatingLabel>
                    
                    <FloatingLabel
                        controlId="workout"
                        label="Exercise Name"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Exercise Name"
                            value={formValues.workout}
                            onChange={handleInputChange}
                            readOnly  // Not allowing exercise name change to maintain consistency
                            className="bg-light"
                        />
                    </FloatingLabel>
                    
                    <div className="row">
                        <div className="col-6">
                            <FloatingLabel
                                controlId="workoutSets"
                                label="Sets"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="number"
                                    placeholder="Sets"
                                    min="1"
                                    max="20"
                                    value={formValues.workoutSets}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FloatingLabel>
                        </div>
                        
                        <div className="col-6">
                            <FloatingLabel
                                controlId="workoutRepetitions"
                                label="Repetitions"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="number"
                                    placeholder="Repetitions"
                                    min="1"
                                    max="100"
                                    value={formValues.workoutRepetitions}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FloatingLabel>
                        </div>
                    </div>
                    
                    <FloatingLabel
                        controlId="workoutLink"
                        label="Demonstration URL (Optional)"
                    >
                        <Form.Control
                            type="url"
                            placeholder="https://example.com/workout-demo"
                            value={formValues.workoutLink}
                            onChange={handleInputChange}
                        />
                        <Form.Text className="text-muted">
                            Link to exercise demonstration or instructions
                        </Form.Text>
                    </FloatingLabel>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditWorkoutModal;