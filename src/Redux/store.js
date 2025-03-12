import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from './workoutSlice';

// Create Redux store
const store = configureStore({
    reducer: {
        workouts: workoutReducer,
    },
    // Add middleware for localStorage persistence (optional)
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

// Optional: Add localStorage persistence
store.subscribe(() => {
    try {
        const { workouts } = store.getState();
        localStorage.setItem('workoutPlannerState', JSON.stringify({ workouts }));
    } catch (error) {
        console.error('Could not save state to localStorage:', error);
    }
});

export default store;