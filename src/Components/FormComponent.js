import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../Redux/workoutSlice';
import plannerIcon from '../Assets/images/plannerIcon.svg';
 
function FormComponent({ onCustomizeClick }) {
    let [inputs, setInputs] = useState({
        muscles: [],
        workouts: []
    });
    let [formValues, setFormValues] = useState({
        muscle: '',
        workout: '',
        workoutSets: '',
        workoutRepetitions: ''
    });
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://api.algobook.info/v1/gym/categories');
                const result = await response.json();
                setInputs({ ...inputs, muscles: result ?? [] });
            } catch (error) {
                console.error(error);
                setError('Failed to load muscle groups. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!formValues.muscle) return;
            
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.algobook.info/v1/gym/categories/${formValues.muscle}`);
                const result = await response.json();
                setInputs((prev) => ({ ...prev, workouts: result ?? [] }));
            } catch (error) {
                console.error(error);
                setError('Failed to load workouts. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        
        if(formValues.muscle) {
            fetchWorkouts();
        } else {
            setInputs((prev) => ({ ...prev, workouts: [] }));
        }
    }, [formValues.muscle]);

    const handleFormChange = (event) => {
        setFormValues((prev) => ({ ...prev, [event.target.id]: event.target.value}));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const uid = function(){
            return Date.now().toString(36) + Math.random().toString(3);
        }
        
        const workoutLink = inputs.workouts?.exercises?.find((workout) => 
            workout.name === formValues.workout
        )?.infoLink || '';
        
        dispatch({ 
            type: addWorkout, 
            payload: {
                ...formValues, 
                id: uid(), 
                workoutLink: workoutLink
            }
        });
        
        // Reset form after submission
        setFormValues({
            muscle: '',
            workout: '',
            workoutSets: '',
            workoutRepetitions: ''
        });
    }
    
    return (
        <div>
            <img src={plannerIcon} className='workoutIcon d-none d-sm-block' alt='workout-planner logo'/>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="muscle"
                    label="Select your target muscle"
                    className="mb-3"
                >
                    <Form.Select 
                        required 
                        aria-label="muscleSelector" 
                        value={formValues.muscle} 
                        onChange={handleFormChange}
                        disabled={loading}
                    >
                        <option value=''>Select Muscle</option>
                        {inputs.muscles && inputs.muscles.map((muscle, index) => {
                            const sentenceCaseMuscle = muscle.charAt(0).toUpperCase() + muscle.slice(1);
                            return <option key={index} value={muscle}>{sentenceCaseMuscle}</option>
                        })}
                    </Form.Select>
                </FloatingLabel>
                
                <FloatingLabel
                    controlId="workout"
                    label="Select your workout"
                    className="mb-3"
                >
                    <Form.Select 
                        required 
                        aria-label="workoutSelector" 
                        value={formValues.workout} 
                        onChange={handleFormChange}
                        disabled={loading || !formValues.muscle}
                    >
                        <option value=''>{formValues.muscle ? 'Select workout' : 'Please select a target muscle'}</option>
                        {inputs.workouts?.exercises?.length > 0 && inputs.workouts.exercises.map((workout, index) => {
                            return <option key={index} value={workout.name}>{workout.name}</option>
                        })}
                    </Form.Select>
                </FloatingLabel>
                
                <Form.Floating className="mb-3">
                    <Form.Control
                        required
                        id="workoutSets"
                        type="number"
                        placeholder="Enter number of sets"
                        value={formValues.workoutSets}
                        onChange={handleFormChange}
                        min="1"
                        max="20"
                    />
                    <label htmlFor="workoutSets">Total Sets</label>
                </Form.Floating>
                
                <Form.Floating className="mb-3">
                    <Form.Control
                        required
                        id="workoutRepetitions"
                        type="number"
                        placeholder="Enter number of Repetitions"
                        value={formValues.workoutRepetitions}
                        onChange={handleFormChange}
                        min="1"
                        max="100"
                    />
                    <label htmlFor="workoutRepetitions">Total Repetitions</label>
                </Form.Floating>
                
                <div className='d-lg-flex justify-content-between custom-btns gap-2'>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        className="custom-btn w-100 mb-2 mb-lg-0"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Add Workout'}
                    </Button>
                    
                    <Button 
                        className="custom-btn customize-button w-100"
                        onClick={(e) => {
                            e.preventDefault();
                            onCustomizeClick();
                        }}
                    >
                        Customize
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default FormComponent;