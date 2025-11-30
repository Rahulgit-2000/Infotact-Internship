import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { mockUserData, mockAdminUser } from '../data/mockData';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = ({ onLogin, onSetPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });

    // --- Admin Login Check ---
    // In a real app, the backend would return a user object with a 'role'
    // API Call: POST /api/auth/login (Section 3.1)
    if (email === 'admin@app.com') {
      console.log('Admin login successful');
      onLogin(mockAdminUser);
    } else {
      // Regular user login
      console.log('User login successful');
      onLogin(mockUserData);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8">
        <Card className="p-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to Wellness+
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <div className="text-xs text-gray-500">
              <p>(Hint: Use <span className="font-medium">admin@app.com</span> to log in as Admin, or any other email for a regular user.)</p>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => onSetPage('register')}
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign up
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;