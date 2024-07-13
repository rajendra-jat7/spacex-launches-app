import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      {authState.status === 'loading' && <p>Loading...</p>}
      {authState.error && <p className="text-red-500">{authState.error}</p>}
      {authState.user ? (
        <p>Welcome, {authState.user.email}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              className="p-2 border border-gray-300 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              className="p-2 border border-gray-300 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
