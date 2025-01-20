import React, { useRef } from 'react';
import { Button, Table } from 'react-bootstrap';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
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
        const doc = new jsPDF('l', 'pt','a4',true);


        doc.html(downloadRef.current, {

            async callback(doc) {
                await doc.save('document');
            },
        });
    };

    return (
        <>
            <div className='h-100 overflow-auto table-container w-100'>
                <Table bordered hover className='mb-0 position-relative h-100' ref={downloadRef}>
                    <thead className='position-sticky top-0'>
                        <tr>
                            <th>#</th>
                            <th>Muscle</th>
                            <th>Workout</th>
                            <th>Sets</th>
                            <th>Repetitions</th>
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
                                <td>{workout.workoutSets}</td>
                                <td>{workout.workoutRepetitions}</td>
                                <td className="text-center"><a href={workout.workoutLink} target="_blank" rel="noreferrer">View Demo</a></td>
                                <td className="text-center"><Button onClick={deleteWorkouts(workout.id)} variant="secondary" size="sm" ><PencilSquare /></Button>&nbsp;&nbsp;&nbsp;<Button onClick={deleteWorkouts(workout.id)} variant="secondary" size="sm" ><Trash3 /></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button variant="success" className='m-2'onClick={handleGeneratePdf} >Download Plan</Button>
        </>
    )
}

export default TableComponent