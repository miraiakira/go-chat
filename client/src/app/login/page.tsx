'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/constants/index';

const Index = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHdandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        const user = {
          username: data.username,
          id: data.id,
        };
        localStorage.setItem('user_info', JSON.stringify(user));
        return router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-w-full min-h-screen">
      <form className="flex flex-col md:w-1/5">
        <div className="text-3xl font-bold text-center">
          <span className="text-blue-600">Welcome!</span>
        </div>
        <input
          placeholder="email"
          className="p-3 mt-8 border-2 rounded-md border-grey focus:outline-none focus:border-blue"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 mt-8 border-2 rounded-md border-grey focus:outline-none focus:border-blue"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="p-3 mt-6 rounded-md bg-blue-600 font-bold text-white"
          type="submit"
          onClick={submitHdandler}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Index;
