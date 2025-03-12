import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { BarChartFill, ClockFill, Lightning, Trophy } from 'react-bootstrap-icons';

function WorkoutStats() {
    const workouts = useSelector((state) => state.workouts.workouts);
    
    // If no workouts, show a simple message
    if (workouts.length === 0) {
        return (
            <div className="stats-container text-center p-3">
                <h5 className="mb-3">Workout Statistics</h5>
                <p className="text-muted">
                    Add exercises to your plan to see statistics.
                </p>
            </div>
        );
    }
    
    // Calculate total exercises
    const totalExercises = workouts.length;
    
    // Calculate total sets
    const totalSets = workouts.reduce((total, workout) => {
        return total + parseInt(workout.workoutSets || 0);
    }, 0);
    
    // Calculate total reps
    const totalReps = workouts.reduce((total, workout) => {
        return total + (parseInt(workout.workoutSets || 0) * parseInt(workout.workoutRepetitions || 0));
    }, 0);
    
    // Calculate estimated workout duration (rough estimate: 2 mins per set)
    const estimatedDuration = totalSets * 2;
    
    // Count exercises by muscle group
    const muscleGroups = {};
    workouts.forEach(workout => {
        const muscle = workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1);
        muscleGroups[muscle] = (muscleGroups[muscle] || 0) + 1;
    });
    
    // Find most targeted muscle
    let mostTargetedMuscle = '';
    let highestCount = 0;
    
    Object.entries(muscleGroups).forEach(([muscle, count]) => {
        if (count > highestCount) {
            highestCount = count;
            mostTargetedMuscle = muscle;
        }
    });
    
    return (
        <div className="stats-container">
            <h5 className="mb-3">Workout Statistics</h5>
            
            <Row className="g-3">
                <Col xs={6} md={6}>
                    <div className="stat-box">
                        <Lightning size={20} className="mb-2 text-primary" />
                        <h3>{totalExercises}</h3>
                        <p>Exercises</p>
                    </div>
                </Col>
                
                <Col xs={6} md={6}>
                    <div className="stat-box">
                        <BarChartFill size={20} className="mb-2 text-primary" />
                        <h3>{totalSets}</h3>
                        <p>Total Sets</p>
                    </div>
                </Col>
                
                <Col xs={6} md={6}>
                    <div className="stat-box">
                        <Trophy size={20} className="mb-2 text-primary" />
                        <h3>{totalReps}</h3>
                        <p>Total Reps</p>
                    </div>
                </Col>
                
                <Col xs={6} md={6}>
                    <div className="stat-box">
                        <ClockFill size={20} className="mb-2 text-primary" />
                        <h3>~{estimatedDuration} min</h3>
                        <p>Est. Duration</p>
                    </div>
                </Col>
            </Row>
            
            {mostTargetedMuscle && (
                <div className="mt-3 p-3 bg-light rounded">
                    <h6 className="mb-2">Muscle Focus</h6>
                    <p className="mb-0 small">
                        Your plan focuses most on <strong>{mostTargetedMuscle}</strong> with {highestCount} exercises.
                    </p>
                </div>
            )}
        </div>
    );
}

export default WorkoutStats;