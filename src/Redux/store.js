import { configureStore } from "@reduxjs/toolkit";
import workoutReduce from './workoutSlice';

export default configureStore({
    reducer: {
        workouts : workoutReduce,
    }
});