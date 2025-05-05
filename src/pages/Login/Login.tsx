// src/pages/Login/Login.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // setError('');

    // const loginData = { email, password };

    // try {
    //   const response = await axios.post('http://localhost:3001/api/users/login', loginData, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   localStorage.setItem('token', response.data.token);
    //   localStorage.setItem('user', JSON.stringify(response.data.user));
    //   alert('successfully login')
    // } catch (error: any) {
    //   setError(error.response?.data?.message || 'Something went wrong');
    // }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>

        <div className="mt-3 text-center">
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
