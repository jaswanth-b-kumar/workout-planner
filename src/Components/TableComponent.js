import React, { useState } from 'react';
import { Button, Table, Badge } from 'react-bootstrap';
import { PencilFill, TrashFill, BoxArrowUpRight } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout } from '../Redux/workoutSlice';
import EditWorkoutModal from './EditWorkoutModal';

function TableComponent() {
    const workouts = useSelector((state) => state.workouts.workouts);
    const dispatch = useDispatch();
    
    const [editWorkout, setEditWorkout] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    
    // Handlers for workout deletion
    const handleDeleteWorkout = (id) => {
        if (window.confirm('Are you sure you want to remove this exercise from your plan?')) {
            dispatch(deleteWorkout(id));
        }
    };
    
    // Handlers for workout editing
    const handleEditClick = (workout) => {
        setEditWorkout(workout);
        setShowEditModal(true);
    };
    
    const handleCloseModal = () => {
        setShowEditModal(false);
        setEditWorkout(null);
    };

    return (
        <div className="table-wrapper">
            <div className="table-header">
                <h4 className="m-0">Your Workout Plan</h4>
            </div>
            
            <div className="table-container">
                <Table hover responsive className="mb-0">
                    <thead>
                        <tr>
                            <th className="d-none d-lg-table-cell">#</th>
                            <th>Muscle</th>
                            <th>Exercise</th>
                            <th>Sets × Reps</th>
                            <th className="d-none d-md-table-cell">Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((workout, index) => (
                            <tr key={workout.id || index}>
                                <td className="d-none d-lg-table-cell">{index + 1}</td>
                                <td>
                                    <span className="muscle-badge">
                                        {workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1)}
                                    </span>
                                </td>
                                <td>{workout.workout}</td>
                                <td>{workout.workoutSets} × {workout.workoutRepetitions}</td>
                                <td className="d-none d-md-table-cell">
                                    {workout.workoutLink ? (
                                        <a 
                                            href={workout.workoutLink} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="demo-link"
                                        >
                                            View Demo <BoxArrowUpRight size={14} />
                                        </a>
                                    ) : (
                                        <span className="text-muted">Not available</span>
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            className="action-btn"
                                            onClick={() => handleEditClick(workout)}
                                        >
                                            <PencilFill size={14} />
                                        </Button>
                                        
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            className="action-btn"
                                            onClick={() => handleDeleteWorkout(workout.id)}
                                        >
                                            <TrashFill size={14} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            
            {/* Edit Workout Modal */}
            <EditWorkoutModal 
                show={showEditModal}
                workout={editWorkout}
                onHide={handleCloseModal}
            />
        </div>
    );
}

export default TableComponent;