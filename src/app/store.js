import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import launchesReducer from '../features/launches/launchesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    launches: launchesReducer,
  },
});
