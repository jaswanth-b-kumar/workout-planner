import React, { useEffect, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap';

function FormComponent() {
    let [inputs, setInputs] = useState({});

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

    const getMuscleWorkouts = async (event) => {
        try {
            const response = await fetch(`https://api.algobook.info/v1/gym/categories/${event.target.value}`);
            const result = await response.json();
            setInputs({ ...inputs, workouts: result ?? [], selectedMuscle: event.target.value });
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = () => {
        return;
    }
    return (
        <div>
            <Form>
                <FloatingLabel
                    controlId="formMuscleSelect"
                    label="Select your target muscle"
                    className="mb-3"
                >
                    <Form.Select aria-label="muscleSelector" onChange={getMuscleWorkouts}>
                        <option>Select muscle</option>
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
                    <Form.Select aria-label="workoutSelector">
                        <option>{inputs.selectedMuscle ? 'Select workout' : 'Please select a target muscle'}</option>
                        {inputs.workouts && inputs.workouts.exercises.map((workout, index) => {
                            return <option key={index} value={workout.name}>{workout.name}</option>
                        })}
                    </Form.Select>
                </FloatingLabel>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="formSets"
                        type="number"
                        placeholder="Enter number of sets"
                    />
                    <label htmlFor="floatingInputCustom">Total Sets</label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                    <Form.Control
                        id="formRepetitions"
                        type="number"
                        placeholder="Enter number of Repetitions"
                    />
                    <label htmlFor="floatingInputCustom">Total Repetitions</label>
                </Form.Floating>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default FormComponent