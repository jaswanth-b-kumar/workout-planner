import React, { useState } from 'react';
import { Button, Table, Badge, Dropdown } from 'react-bootstrap';
import { BoxArrowUpRight, PencilSquare, Trash3, ThreeDots } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout } from '../Redux/workoutSlice';

function TableComponent({ onEditWorkout }) {
    const workouts = useSelector((state) => state.workouts.workouts);
    const dispatch = useDispatch();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const deleteWorkouts = (id) => () => {
        if (window.confirm('Are you sure you want to remove this exercise?')) {
            dispatch({ type: deleteWorkout, payload: id });
        }
    };

    // Sort function for the table
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Apply sorting to workouts array
    const sortedWorkouts = React.useMemo(() => {
        let sortableItems = [...workouts];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [workouts, sortConfig]);

    // Function to get header class for sorting UI
    const getSortClass = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <div className="table-container w-100 h-100 d-flex flex-column">
            <div className="table-header d-flex justify-content-between align-items-center p-3 bg-light">
                <h4 className="m-0">Workout Plan</h4>
                <div className="table-actions">
                    {/* Additional table actions could go here */}
                </div>
            </div>

            <div className="table-body flex-grow-1 overflow-auto">
                <Table bordered hover responsive className="mb-0 position-relative workout-table">
                    <thead className="position-sticky top-0 bg-white">
                        <tr>
                            <th className="d-none d-lg-table-cell">#</th>
                            <th 
                                className={`sortable ${getSortClass('muscle')}`}
                                onClick={() => requestSort('muscle')}
                            >
                                Muscle Group
                            </th>
                            <th 
                                className={`sortable ${getSortClass('workout')}`}
                                onClick={() => requestSort('workout')}
                            >
                                Exercise
                            </th>
                            <th>Sets × Reps</th>
                            <th className="d-none d-md-table-cell">Demonstration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedWorkouts.map((workout, index) => {
                            // Format muscle name
                            const muscleName = workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1);
                            
                            return (
                                <tr key={workout.id || index}>
                                    <td className="d-none d-lg-table-cell">{index + 1}</td>
                                    <td>
                                        <Badge bg="light" text="dark" className="muscle-badge">
                                            {muscleName}
                                        </Badge>
                                    </td>
                                    <td>{workout.workout}</td>
                                    <td>
                                        <span className="sets-reps">
                                            <span className="sets">{workout.workoutSets}</span>
                                            <span className="separator">×</span>
                                            <span className="reps">{workout.workoutRepetitions}</span>
                                        </span>
                                    </td>
                                    <td className="d-none d-md-table-cell">
                                        {workout.workoutLink ? (
                                            <a 
                                                href={workout.workoutLink} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="demo-link"
                                            >
                                                View Demo <BoxArrowUpRight />
                                            </a>
                                        ) : (
                                            <span className="text-muted">Not available</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                className="me-1"
                                                onClick={() => onEditWorkout(workout)}
                                            >
                                                <PencilSquare />
                                            </Button>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                onClick={deleteWorkouts(workout.id)}
                                            >
                                                <Trash3 />
                                            </Button>
                                            <Dropdown className="d-md-none ms-1">
                                                <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${workout.id}`}>
                                                    <ThreeDots />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {workout.workoutLink && (
                                                        <Dropdown.Item 
                                                            href={workout.workoutLink} 
                                                            target="_blank"
                                                        >
                                                            View Demo
                                                        </Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default TableComponent;