'use client';
import React, { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export interface UserInfo {
  username: string;
  id: string;
}

export const AuthContext = createContext<{
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  user: UserInfo;
  setUser: (user: UserInfo) => void;
}>({
  authenticated: true,
  setAuthenticated: () => {},
  user: { username: '', id: '' },
  setUser: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState<UserInfo>({ username: '', id: '' });

  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem('user_info');

    if (!userInfo) {
      if (window.location.pathname !== '/signup') {
        router.push('/login');
        return;
      }
    } else {
      const user: UserInfo = JSON.parse(userInfo);
      if (user) {
        setUser({
          username: user.username,
          id: user.id,
        });
      }
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
