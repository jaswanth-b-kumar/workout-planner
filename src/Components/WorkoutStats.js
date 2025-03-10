import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function WorkoutStats() {
  const workouts = useSelector((state) => state.workouts.workouts);
  
  // Count exercises by muscle group
  const muscleGroups = {};
  workouts.forEach(workout => {
    const muscle = workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1);
    muscleGroups[muscle] = (muscleGroups[muscle] || 0) + 1;
  });
  
  // Convert to chart data
  const chartData = Object.keys(muscleGroups).map(muscle => ({
    name: muscle,
    count: muscleGroups[muscle]
  }));
  
  // Calculate workout stats
  const totalExercises = workouts.length;
  const totalSets = workouts.reduce((sum, workout) => sum + parseInt(workout.workoutSets), 0);
  const totalReps = workouts.reduce((sum, workout) => {
    return sum + (parseInt(workout.workoutSets) * parseInt(workout.workoutRepetitions));
  }, 0);
  
  // Estimate workout duration (rough estimate: 2 mins per set including rest)
  const estimatedDuration = totalSets * 2;
  
  if (workouts.length === 0) {
    return (
      <Card className="stats-container mt-3 text-center">
        <Card.Body>
          <Card.Title>Workout Summary</Card.Title>
          <p className="text-muted">Add exercises to see your workout statistics</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="stats-container mt-3">
      <Card.Body>
        <Card.Title>Workout Summary</Card.Title>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="stat-box">
            <h5>{totalExercises}</h5>
            <p className="text-muted">Exercises</p>
          </div>
          <div className="stat-box">
            <h5>{totalSets}</h5>
            <p className="text-muted">Total Sets</p>
          </div>
          <div className="stat-box">
            <h5>{totalReps}</h5>
            <p className="text-muted">Total Reps</p>
          </div>
          <div className="stat-box">
            <h5>~{estimatedDuration} min</h5>
            <p className="text-muted">Est. Duration</p>
          </div>
        </div>
        
        {chartData.length > 0 && (
          <div className="mt-3" style={{ height: '150px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" name="Exercises" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default WorkoutStats;