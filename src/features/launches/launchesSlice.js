import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchLaunches = createAsyncThunk('launches/fetchLaunches', async () => {
//   const response = await fetch('https://api.spacexdata.com/v3/launches');
//   const data = await response.json();
//   return data;
// });

// src/features/launches/launchesSlice.js
export const fetchLaunches = createAsyncThunk('launches/fetchLaunches', async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});


const launchesSlice = createSlice({
  name: 'launches',
  initialState: {
    launches: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.launches = action.payload;
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default launchesSlice.reducer;
