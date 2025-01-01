import { createSlice } from "@reduxjs/toolkit";

export const workoutSlice = createSlice({
    name: 'workouts',
    initialState: {
        workouts: []
    },
    reducers: {
        addWorkout: (state, action) => {
            state.workouts.push(action.payload);
        },
        deleteWorkout: (state, action) => {
            state.workouts = state.workouts.filter((workout) => workout.id !== action.payload);
        }
    }
})

export const { addWorkout, deleteWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;