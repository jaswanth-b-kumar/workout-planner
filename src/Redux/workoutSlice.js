import { createSlice } from "@reduxjs/toolkit";

export const workoutSlice = createSlice({
    name: 'workouts',
    initialState: {
        workouts: []
    },
    reducers: {
        addWorkout: (state, action) => {
            state.workouts.push(action.payload);
        }
    }
})

export const { addWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;