import React, { useRef } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BoxArrowUpRight, PencilSquare, Trash3 } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout } from '../Redux/workoutSlice';
import jsPDF from 'jspdf';


function TableComponent() {
    const workouts = useSelector((state) => state.workouts.workouts);
    const dispatch = useDispatch();
    const deleteWorkouts = (id) => () => {
        dispatch({ type: deleteWorkout, payload: id });
    };
    const downloadRef = useRef(null);
    const handleGeneratePdf = () => {
        const doc = new jsPDF('l', 'pt', 'a4', true);


        doc.html(downloadRef.current, {

            async callback(doc) {
                await doc.save('document');
            },
        });
    };

    return (
        <>
            <div className='h-100 overflow-auto table-container w-100'>
                <Table bordered hover className='mb-0 position-relative w-100' ref={downloadRef}>
                    <thead className='position-sticky'>
                        <tr>
                            <th>#</th>
                            <th>Muscle</th>
                            <th>Workout</th>
                            <th>Sets x Repetitions</th>
                            <th>Details</th>
                            <th>Edit / Delete Workout
                                {/* Todo - Modify */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.length > 0 && workouts.map((workout, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{workout.muscle}</td>
                                <td>{workout.workout}</td>
                                <td>{workout.workoutSets} x {workout.workoutRepetitions}</td>
                                <td><a href={workout.workoutLink} target="_blank" rel="noreferrer">View Demo <BoxArrowUpRight /> </a></td>
                                <td><Button variant="secondary" size="sm" ><PencilSquare /></Button>&nbsp;&nbsp;&nbsp;<Button onClick={deleteWorkouts(workout.id)} variant="secondary" size="sm" ><Trash3 /></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {
                    workouts.length == 0 && <div className='user-guide'>
                        <h2 className='user-guide-header'>Welcome to Your Personalized Workout Planner!</h2>
                        <h5 className='user-guide-subheader'>Getting Started:</h5>
                        <ul>
                            <li>Step 1: Select your target muscle from the dropdown.</li>
                            <li>Step 2: Choose a workout from the available options.</li>
                            <li>Step 3: Customize the number of sets and repetitions.</li>
                            <li>Step 4: Click "Add Workout" to add the exercise to your plan.</li>
                            <li>Step 5: Repeat steps 1-4 to add more exercises to your plan.</li>
                            <li>Step 6: Download your plan as a PDF.</li>
                        </ul>
                    </div>
                }
            </div>
            <Button variant="success" className='m-2' onClick={handleGeneratePdf} >Download Plan</Button>
        </>
    )
}

export default TableComponent