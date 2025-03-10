import React from 'react';
import { Page, View, Document, StyleSheet, Text, Link, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    backgroundColor: '#fff'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #DDD',
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 5
  },
  workoutSection: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f8f9fa',
    borderLeft: '4pt solid #007bff'
  },
  workoutTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#333'
  },
  workoutDetail: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555'
  },
  link: {
    fontSize: 12,
    color: '#007bff',
    textDecoration: 'none'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    paddingTop: 10,
    borderTop: '1pt solid #DDD'
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  statBox: {
    width: '22%',
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  statLabel: {
    fontSize: 10,
    color: '#666'
  },
  muscleGroupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1pt solid #EEE'
  },
  logo: {
    width: 50,
    height: 50
  },
  date: {
    fontSize: 10,
    color: '#666',
    marginTop: 2
  }
});

// Create Document Component
const DownloadComponent = ({ workouts, title = "My Workout Plan" }) => {
  // Get current date for the PDF
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Organize workouts by muscle group
  const workoutsByMuscle = {};
  workouts.forEach(workout => {
    const muscleName = workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1);
    if (!workoutsByMuscle[muscleName]) {
      workoutsByMuscle[muscleName] = [];
    }
    workoutsByMuscle[muscleName].push(workout);
  });
  
  // Calculate workout stats
  const totalExercises = workouts.length;
  const totalSets = workouts.reduce((sum, workout) => sum + parseInt(workout.workoutSets), 0);
  const totalReps = workouts.reduce((sum, workout) => {
    return sum + (parseInt(workout.workoutSets) * parseInt(workout.workoutRepetitions));
  }, 0);
  const estimatedDuration = totalSets * 2; // Rough estimate: 2 mins per set including rest
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>Created on {currentDate}</Text>
          </View>
          {/* Could add a logo here */}
          {/* <Image style={styles.logo} src="/path/to/your/logo.png" /> */}
        </View>
        
        {/* Workout Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalExercises}</Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalSets}</Text>
            <Text style={styles.statLabel}>Total Sets</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalReps}</Text>
            <Text style={styles.statLabel}>Total Reps</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>~{estimatedDuration} min</Text>
            <Text style={styles.statLabel}>Est. Duration</Text>
          </View>
        </View>
        
        {/* Workout Details by Muscle Group */}
        {Object.keys(workoutsByMuscle).map((muscleName, index) => (
          <View key={index}>
            <Text style={styles.muscleGroupTitle}>{muscleName} Exercises</Text>
            
            {workoutsByMuscle[muscleName].map((workout, workoutIndex) => (
              <View key={workoutIndex} style={styles.workoutSection}>
                <Text style={styles.workoutTitle}>{workout.workout}</Text>
                <Text style={styles.workoutDetail}>Sets: {workout.workoutSets}</Text>
                <Text style={styles.workoutDetail}>Repetitions: {workout.workoutRepetitions}</Text>
                <Text style={styles.workoutDetail}>Total Volume: {workout.workoutSets * workout.workoutRepetitions} reps</Text>
                
                {workout.workoutLink && (
                  <Link src={workout.workoutLink} style={styles.link}>
                    View demonstration online
                  </Link>
                )}
              </View>
            ))}
          </View>
        ))}
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated with Workout Planner | www.yourworkoutplanner.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DownloadComponent;