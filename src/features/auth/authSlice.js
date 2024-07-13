import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockSignup = async (user) => {
  console.log('Mock signup called with user:', user);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user, token: 'mockToken' });
    }, 500);
  });
};

const mockLogin = async (credentials) => {
  console.log('Mock login called with credentials:', credentials);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { email: credentials.email }, token: 'mockToken' });
    }, 500);
  });
};

export const signupUser = createAsyncThunk('auth/signupUser', async (user) => {
  const response = await mockSignup(user);
  console.log('Signup response:', response);
  return response;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await mockLogin(credentials);
  console.log('Login response:', response);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        console.log('Signup pending');
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log('Signup fulfilled', action.payload);
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        console.log('Signup rejected', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        console.log('Login pending');
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login fulfilled', action.payload);
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Login rejected', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
