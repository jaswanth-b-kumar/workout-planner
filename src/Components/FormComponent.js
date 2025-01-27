import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../Redux/workoutSlice';
import plannerIcon from '../Assets/images/plannerIcon.svg'
 
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }
    const handleSubmit = (e) => {
        const uid = function(){
            return Date.now().toString(36) + Math.random().toString(3);
        }
        const workoutLink = inputs.workouts.exercises.find((workout) => workout.name === formValues.workout)?.infoLink;
        dispatch({ type: addWorkout, payload: {...formValues, id: uid(), workoutLink : workoutLink}});
        e.preventDefault();
        return;
    }
    return (
        <div>
            <img src={plannerIcon} className='workoutIcon' alt='workout-planner logo'/>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="formMuscleSelect"
                    label="Select your target muscle"
                    className="mb-3"
                >
                    <Form.Select required aria-label="muscleSelector" id='muscle' value={formValues.muscle} onChange={handleFormChange}>
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
                    <Form.Select required aria-label="workoutSelector" id='workout' value={formValues.muscle ? formValues.workout : ''} onChange={handleFormChange}>
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
                        value={formValues.sets}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="floatingInputCustom">Total Sets</label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                    <Form.Control
                        required
                        id="workoutRepetitions"
                        type="number"
                        placeholder="Enter number of Repetitions"
                        value={formValues.repetitions}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="floatingInputCustom">Total Repetitions</label>
                </Form.Floating>
                <div className='d-flex justify-content-between custom-btns'>
                    <Button variant="primary" type="submit" className="custom-btn">
                        Add Workout
                    </Button>
                    <Button className="custom-btn customize-button">
                        Customize
                    </Button>
                </div>
            </Form>

        </div>
    )
}

export default FormComponent