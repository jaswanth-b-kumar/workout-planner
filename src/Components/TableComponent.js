import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Trash3 } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout } from '../Redux/workoutSlice';

function TableComponent() {
    const workouts = useSelector((state) => state.workouts.workouts);
    const dispatch = useDispatch();
    const deleteWorkouts = (id) => () => {
        dispatch({ type: deleteWorkout, payload: id });
    };
    return (
        <div className='overflow-auto h-100 display-block'>
            <Table striped bordered hover className='mb-0'>
                <thead className='position-sticky'>
                    <tr>
                        <th>#</th>
                        <th>Muscle</th>
                        <th>Workout</th>
                        <th>Sets</th>
                        <th>Repetitions</th>
                        <th>Details</th>
                        <th>Delete Workout
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
                            <td>{workout.workoutSets}</td>
                            <td>{workout.workoutRepetitions}</td>
                            <td><a href={workout.workoutLink} target="_blank" rel="noreferrer">View Demo</a></td>
                            <td onClick={deleteWorkouts(workout.id)}><Button variant="outline-danger" size="sm" ><Trash3 /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TableComponent