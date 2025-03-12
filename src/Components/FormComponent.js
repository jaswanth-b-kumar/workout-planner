import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../Redux/workoutSlice';
import plannerIcon from '../Assets/images/plannerIcon.svg';

function FormComponent() {
    const [inputs, setInputs] = useState({
        muscles: [],
        workouts: []
    });
    
    const [formValues, setFormValues] = useState({
        muscle: '',
        workout: '',
        workoutSets: '',
        workoutRepetitions: ''
    });
    
    const [loading, setLoading] = useState({
        muscles: true,
        workouts: false
    });
    
    const [error, setError] = useState({
        muscles: null,
        workouts: null
    });

    const dispatch = useDispatch();

    // Fetch muscle groups on component mount
    useEffect(() => {
        const fetchMuscles = async () => {
            try {
                setLoading(prev => ({ ...prev, muscles: true }));
                const response = await fetch('https://api.algobook.info/v1/gym/categories');
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch muscle groups: ${response.status}`);
                }
                
                const result = await response.json();
                setInputs(prev => ({ ...prev, muscles: result || [] }));
                setError(prev => ({ ...prev, muscles: null }));
            } catch (err) {
                console.error('Error fetching muscle groups:', err);
                setError(prev => ({ ...prev, muscles: err.message }));
            } finally {
                setLoading(prev => ({ ...prev, muscles: false }));
            }
        };

        fetchMuscles();
    }, []);

    // Fetch workouts when muscle is selected
    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!formValues.muscle) {
                setInputs(prev => ({ ...prev, workouts: [] }));
                return;
            }
            
            try {
                setLoading(prev => ({ ...prev, workouts: true }));
                const response = await fetch(`https://api.algobook.info/v1/gym/categories/${formValues.muscle}`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch workouts: ${response.status}`);
                }
                
                const result = await response.json();
                setInputs(prev => ({ ...prev, workouts: result || [] }));
                setError(prev => ({ ...prev, workouts: null }));
            } catch (err) {
                console.error('Error fetching workouts:', err);
                setError(prev => ({ ...prev, workouts: err.message }));
            } finally {
                setLoading(prev => ({ ...prev, workouts: false }));
            }
        };
        
        if (formValues.muscle) {
            fetchWorkouts();
        } else {
            setInputs(prev => ({ ...prev, workouts: [] }));
        }
    }, [formValues.muscle]);

    const handleFormChange = (event) => {
        const { id, value } = event.target;
        setFormValues(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Generate unique ID
        const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
        
        // Find workout link from the selected workout
        const workoutLink = inputs.workouts?.exercises?.find(
            workout => workout.name === formValues.workout
        )?.infoLink || '';
        
        // Dispatch action to add workout
        dispatch({ 
            type: addWorkout, 
            payload: {
                ...formValues,
                id: uid(),
                workoutLink
            }
        });
        
        // Reset form values except for muscle selection
        setFormValues(prev => ({
            ...prev,
            workout: '',
            workoutSets: '',
            workoutRepetitions: ''
        }));
    };

    return (
        <div className="form-container">
            <img 
                src={plannerIcon} 
                className="workoutIcon" 
                alt="Workout Planner" 
            />
            
            <h4 className="text-center mb-4">Build Your Workout</h4>
            
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="muscle"
                    label="Target Muscle"
                    className="mb-3"
                >
                    <Form.Select 
                        required
                        value={formValues.muscle}
                        onChange={handleFormChange}
                        disabled={loading.muscles}
                    >
                        <option value="">
                            {loading.muscles ? 'Loading muscles...' : 'Select Muscle'}
                        </option>
                        
                        {inputs.muscles.map((muscle, index) => {
                            // Format muscle name to sentence case
                            const formattedMuscle = muscle.charAt(0).toUpperCase() + muscle.slice(1);
                            
                            return (
                                <option key={index} value={muscle}>
                                    {formattedMuscle}
                                </option>
                            );
                        })}
                    </Form.Select>
                    
                    {error.muscles && (
                        <div className="text-danger mt-1 small">
                            {error.muscles}
                        </div>
                    )}
                </FloatingLabel>
                
                <FloatingLabel
                    controlId="workout"
                    label="Exercise"
                    className="mb-3"
                >
                    <Form.Select 
                        required
                        value={formValues.workout}
                        onChange={handleFormChange}
                        disabled={!formValues.muscle || loading.workouts}
                    >
                        <option value="">
                            {!formValues.muscle
                                ? 'Select a muscle first'
                                : loading.workouts
                                    ? 'Loading exercises...'
                                    : 'Select Exercise'}
                        </option>
                        
                        {inputs.workouts?.exercises?.map((workout, index) => (
                            <option key={index} value={workout.name}>
                                {workout.name}
                            </option>
                        ))}
                    </Form.Select>
                    
                    {error.workouts && (
                        <div className="text-danger mt-1 small">
                            {error.workouts}
                        </div>
                    )}
                </FloatingLabel>
                
                <div className="row">
                    <div className="col-6">
                        <Form.Floating className="mb-3">
                            <Form.Control
                                required
                                id="workoutSets"
                                type="number"
                                min="1"
                                max="20"
                                placeholder="Sets"
                                value={formValues.workoutSets}
                                onChange={handleFormChange}
                            />
                            <label htmlFor="workoutSets">Sets</label>
                        </Form.Floating>
                    </div>
                    
                    <div className="col-6">
                        <Form.Floating className="mb-3">
                            <Form.Control
                                required
                                id="workoutRepetitions"
                                type="number"
                                min="1"
                                max="100"
                                placeholder="Reps"
                                value={formValues.workoutRepetitions}
                                onChange={handleFormChange}
                            />
                            <label htmlFor="workoutRepetitions">Reps</label>
                        </Form.Floating>
                    </div>
                </div>
                
                <div className="custom-btns">
                    <Button 
                        variant="primary" 
                        type="submit" 
                        className="custom-btn"
                        disabled={!formValues.muscle || !formValues.workout}
                    >
                        Add to Plan
                    </Button>
                    
                    <Button 
                        variant="outline-primary" 
                        type="button"
                        className="custom-btn"
                        onClick={() => setFormValues({
                            muscle: '',
                            workout: '',
                            workoutSets: '',
                            workoutRepetitions: ''
                        })}
                    >
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default FormComponent;