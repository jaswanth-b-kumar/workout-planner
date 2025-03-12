import { createSlice } from "@reduxjs/toolkit";

// Try to load state from localStorage if available
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('workoutPlannerState');
        if (serializedState === null) {
            return { workouts: [] };
        }
        return JSON.parse(serializedState).workouts;
    } catch (error) {
        console.error('Could not load state from localStorage:', error);
        return { workouts: [] };
    }
};

// Create the workout slice
export const workoutSlice = createSlice({
    name: 'workouts',
    // Use saved state or default to empty array
    initialState: loadState() || { workouts: [] },
    reducers: {
        // Add a new workout to the state
        addWorkout: (state, action) => {
            state.workouts.push(action.payload);
        },
        // Delete a workout by id
        deleteWorkout: (state, action) => {
            state.workouts = state.workouts.filter(
                (workout) => workout.id !== action.payload
            );
        },
        // Update a workout by id
        updateWorkout: (state, action) => {
            const { id, updatedWorkout } = action.payload;
            const index = state.workouts.findIndex(workout => workout.id === id);
            
            if (index !== -1) {
                state.workouts[index] = {
                    ...state.workouts[index],
                    ...updatedWorkout
                };
            }
        },
        // Clear all workouts
        clearWorkouts: (state) => {
            state.workouts = [];
        }
    }
});

// Export actions
export const { 
    addWorkout, 
    deleteWorkout, 
    updateWorkout,
    clearWorkouts
} = workoutSlice.actions;

// Export reducer
export default workoutSlice.reducer;