import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../Redux/workoutSlice';

function FormComponent() {
    let [inputs, setInputs] = useState({
        muscles: [],
        workouts: []
    });
    let [formValues, setFormValues] = useState({
        muscle: '',
        workout: '',
        workoutSets: '',
        workoutRepetitions: ''
    })

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.algobook.info/v1/gym/categories');
                const result = await response.json();
                setInputs({ ...inputs, muscles: result ?? [] });
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(`https://api.algobook.info/v1/gym/categories/${formValues.muscle}`);
                const result = await response.json();
                setInputs((prev) => ({ ...prev, workouts: result ?? [] }));
            } catch (error) {
                console.error(error);
            }
        }
        if(formValues.muscle) {
            fetchWorkouts();
        }
        else {
            setInputs((prev) => ({ ...prev, workouts: [] }));
        }
    }, [formValues.muscle])

    const handleFormChange = (event) => {
        setFormValues((prev) => ({ ...prev, [event.target.id]: event.target.value}));
        if(event.target.workoutLink) {
            setFormValues((prev) => ({ ...prev, workoutLink: event.target.workoutLink}));
        }
    }
    const handleSubmit = (e) => {
        const uid = function(){
            return Date.now().toString(36) + Math.random().toString(3);
        }
        dispatch({ type: addWorkout, payload: {...formValues, id: uid()} });
        e.preventDefault();
        return;
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="formMuscleSelect"
                    label="Select your target muscle"
                    className="mb-3"
                >
                    <Form.Select aria-label="muscleSelector" id='muscle' value={formValues.muscle} onChange={handleFormChange}>
                        <option value=''>Select muscle</option>
                        {inputs.muscles && inputs.muscles.map((muscle, index) => {
                            return <option key={index} value={muscle}>{muscle}</option>
                        })}
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                    controlId="formWorkoutSelect"
                    label="Select your workout"
                    className="mb-3"
                >
                    <Form.Select aria-label="workoutSelector" id='workout' workoutLink={formValues.muscle ? formValues.workoutLink : ''} value={formValues.muscle ? formValues.workout : ''} onChange={handleFormChange}>
                        <option value=''>{formValues.muscle ? 'Select workout' : 'Please select a target muscle'}</option>
                        {inputs.workouts?.exercises?.length > 0 && inputs.workouts.exercises.map((workout, index) => {
                            return <option key={index} workoutLink={workout.infoLink} value={workout.name}>{workout.name}</option>
                        })}
                    </Form.Select>
                </FloatingLabel>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="workoutSets"
                        type="number"
                        placeholder="Enter number of sets"
                        value={formValues.sets}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="floatingInputCustom">Total Sets</label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                    <Form.Control
                        id="workoutRepetitions"
                        type="number"
                        placeholder="Enter number of Repetitions"
                        value={formValues.repetitions}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="floatingInputCustom">Total Repetitions</label>
                </Form.Floating>
                <Button variant="primary" type="submit">
                    Add Workout
                </Button>
            </Form>

        </div>
    )
}

export default FormComponent