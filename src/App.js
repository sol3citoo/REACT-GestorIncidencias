import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LOGIN from './LOGIN';
import INICIO from './INICIO';
import ADMIN from './ADMIN';

function App() {
  const [usuarioLogin, setUsuarioLogin] = useState(() => {
    const userSaved = localStorage.getItem('usuario');
    return userSaved ? JSON.parse(userSaved) : null;
  });

  useEffect(() => {
    const userSaved = localStorage.getItem('usuario');
    if (userSaved) {
      setUsuarioLogin(JSON.parse(userSaved));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuarioLogin(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          !usuarioLogin ? <LOGIN setUsuarioLogin={setUsuarioLogin} usuarioEstaLogueado={!!usuarioLogin} /> : <Navigate to={usuarioLogin.rol === 'admin' ? '/admin' : '/inicio'} />
        } /> 
        
        <Route path="/inicio" element={usuarioLogin ? <INICIO user={usuarioLogin} logout={logout} setUsuarioLogin={setUsuarioLogin} /> : <Navigate to="/" />} />
        <Route path="/admin" element={usuarioLogin?.rol === 'admin' ? <ADMIN user={usuarioLogin} logout={logout} /> : <Navigate to="/" />} />
        
      </Routes>
    </Router>
  );
}

export default App;