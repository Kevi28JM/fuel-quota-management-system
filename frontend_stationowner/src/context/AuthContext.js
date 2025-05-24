import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [stationId, setStationId] = useState(localStorage.getItem('stationId') || null);

  const login = (token, user, stationId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('stationId', stationId);

    setToken(token);
    setUser(user);
    setStationId(stationId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('stationId');

    setToken(null);
    setUser(null);
    setStationId(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, stationId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
