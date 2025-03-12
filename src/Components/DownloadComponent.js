import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30
  },
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #ddd',
    paddingBottom: 10
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#555'
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    borderLeft: '4pt solid #4361ee'
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5
  },
  muscleHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1pt solid #ddd'
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 3
  },
  label: {
    width: 100,
    fontSize: 10,
    color: '#555'
  },
  value: {
    flex: 1,
    fontSize: 10
  },
  link: {
    fontSize: 10,
    color: '#0000EE',
    textDecoration: 'underline'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap'
  },
  statBox: {
    width: '22%',
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  statLabel: {
    fontSize: 8,
    color: '#555',
    textAlign: 'center',
    marginTop: 3
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#555'
  }
});

// Group workouts by muscle
const groupByMuscle = (workouts) => {
  const grouped = {};
  
  workouts.forEach(workout => {
    const muscleName = workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1);
    
    if (!grouped[muscleName]) {
      grouped[muscleName] = [];
    }
    
    grouped[muscleName].push(workout);
  });
  
  return grouped;
};

// Create Document Component
const DownloadComponent = ({ workouts }) => {
  // Get current date for the header
  const today = new Date();
  const formattedDate = `${today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`;
  
  // Calculate workout statistics
  const totalExercises = workouts.length;
  const totalSets = workouts.reduce((sum, w) => sum + parseInt(w.workoutSets || 0), 0);
  const totalReps = workouts.reduce((sum, w) => {
    return sum + (parseInt(w.workoutSets || 0) * parseInt(w.workoutRepetitions || 0));
  }, 0);
  const estimatedDuration = totalSets * 2; // rough estimate: 2 min per set
  
  // Group workouts by muscle
  const workoutsByMuscle = groupByMuscle(workouts);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Workout Plan</Text>
          <Text style={styles.headerSubtitle}>Created on {formattedDate}</Text>
        </View>
        
        {/* Workout Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalExercises}</Text>
            <Text style={styles.statLabel}>EXERCISES</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalSets}</Text>
            <Text style={styles.statLabel}>TOTAL SETS</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalReps}</Text>
            <Text style={styles.statLabel}>TOTAL REPS</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{estimatedDuration} min</Text>
            <Text style={styles.statLabel}>EST. DURATION</Text>
          </View>
        </View>
        
        {/* Workout Details By Muscle Group */}
        {Object.entries(workoutsByMuscle).map(([muscle, muscleWorkouts]) => (
          <View key={muscle}>
            <Text style={styles.muscleHeader}>{muscle} Exercises</Text>
            
            {muscleWorkouts.map((workout, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{workout.workout}</Text>
                
                <View style={styles.row}>
                  <Text style={styles.label}>Sets:</Text>
                  <Text style={styles.value}>{workout.workoutSets}</Text>
                </View>
                
                <View style={styles.row}>
                  <Text style={styles.label}>Repetitions:</Text>
                  <Text style={styles.value}>{workout.workoutRepetitions}</Text>
                </View>
                
                <View style={styles.row}>
                  <Text style={styles.label}>Total Volume:</Text>
                  <Text style={styles.value}>{workout.workoutSets * workout.workoutRepetitions} reps</Text>
                </View>
                
                {workout.workoutLink && (
                  <View style={styles.row}>
                    <Text style={styles.label}>Demonstration:</Text>
                    <Link src={workout.workoutLink} style={styles.link}>
                      View Exercise Demo
                    </Link>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
        
        {/* Footer */}
        <Text style={styles.footer}>
          Generated with Jaswanth's Workout Planner - Your personal fitness assistant
        </Text>
      </Page>
    </Document>
  );
};

export default DownloadComponent;