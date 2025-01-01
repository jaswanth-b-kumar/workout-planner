import React, { use } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function TableComponent() {
    const workouts = useSelector((state) => state.workouts.workouts);
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Muscle</th>
                    <th>Workout</th>
                    <th>Sets</th>
                    <th>Repetitions</th>
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
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TableComponent