import React from 'react';
import { Page, View, Document, StyleSheet, Text, Link } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1 
  }
});

// Create Document Component
const DownloadComponent = ({workouts}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      { workouts.map((workout) => {
        return <View style={styles.section}>
        <Text>Target Muscle: {workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1)}</Text> 
        <Text>Workout: {workout.workout}</Text> 
        <Text>Sets and Reputations: {workout.workoutSets} x {workout.workoutRepetitions}</Text> 
        <Link src={workout.workoutLink}>Click here to know more about workout</Link>
      </View>
      })}
    </Page>
  </Document>
);

export default DownloadComponent;