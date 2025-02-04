import React, { useRef } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BoxArrowUpRight, PencilSquare, Trash3 } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout } from '../Redux/workoutSlice';
import DownloadComponent from './DownloadComponent';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';


function TableComponent() {
    const workouts = useSelector((state) => state.workouts.workouts);
    const dispatch = useDispatch();
    const deleteWorkouts = (id) => () => {
        dispatch({ type: deleteWorkout, payload: id });
    };

    return (
        <>
            <div className={`table-container w-100 ${workouts.length > 0 ? 'h-100 overflow-auto' : ''}`}>
                <Table bordered hover className='mb-0 position-relative w-100'>
                    <thead className='position-sticky'>
                        <tr>
                            <th className='d-none d-lg-table-cell'>#</th>
                            <th>Muscle</th>
                            <th>Workout</th>
                            <th>Sets x Repetitions</th>
                            <th className='d-none d-md-table-cell'>Details</th>
                            <th>Edit / Delete Workout
                                {/* Todo - Modify */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.length > 0 && workouts.map((workout, index) => (
                            <tr key={index}>
                                <td className='d-none d-lg-table-cell'>{index + 1}</td>
                                <td>
                                    {workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1)}
                                </td>
                                <td>{workout.workout}</td>
                                <td>{workout.workoutSets} x {workout.workoutRepetitions}</td>
                                <td className='d-none d-md-table-cell'><a href={workout.workoutLink} target="_blank" rel="noreferrer">View Demo <BoxArrowUpRight /> </a></td>
                                <td><Button variant="secondary" size="sm" ><PencilSquare /></Button>&nbsp;&nbsp;<Button onClick={deleteWorkouts(workout.id)} variant="secondary" size="sm" ><Trash3 /></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {
                workouts.length === 0 && <div className='d-flex flex-column justify-content-center h-100 w-100'>
                    <div className='user-guide'>
                        <h2 className='user-guide-header'>Welcome to Your Personalized Workout Planner!</h2>
                        <h5 className='user-guide-subheader'>Getting Started:</h5>
                        <ul className='user-guide-list'>
                            <li><b>Step 1:</b> Select your target muscle from the dropdown.</li>
                            <li><b>Step 2:</b> Choose a workout from the available options.</li>
                            <li><b>Step 3:</b> Customize the number of sets and repetitions.</li>
                            <li><b>Step 4:</b> Click "Add Workout" to add the exercise to your plan.</li>
                            <li><b>Step 5:</b> Repeat steps 1-4 to add more exercises to your plan.</li>
                            <li><b>Step 6:</b> Download your plan as a PDF.</li>
                        </ul>
                        <p className='user-guide-footer'><b>Can't find the perfect workout?</b><br />
                            No worries! Use the Customize option to manually enter your desired exercise, sets, and reps. Get creative and build a routine that's uniquely yours!</p>
                    </div>
                </div>
            }
            <PDFDownloadLink variant="success" className='m-2' document={<DownloadComponent workouts={workouts}/>} fileName='workout' >Download Plan</PDFDownloadLink>
        </>
    )
}

export default TableComponent