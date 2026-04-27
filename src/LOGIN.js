import React, { useState, useEffect } from 'react';
import Header from './componentes/Header';
import Footer from './componentes/Footer';

export default function Login({ setUsuarioLogin, usuarioEstaLogueado }) {
  
  const [form, setForm] = useState({ email: '', password: '' });


  useEffect(() => {
    setForm({ email: '', password: '' });
  }, []);

  const entrar = async (e) => {
    e.preventDefault();
    
    if (usuarioEstaLogueado) {
      return;
    }

    try {
      const resp = await fetch("http://localhost:3004/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form) 
      });

      if (resp.ok) {
        const data = await resp.json();
        
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('usuario', JSON.stringify(data.user));
        
        setUsuarioLogin(data.user);
        
      } else {
        alert("Credenciales incorrectas. Revisa el email o la contraseña.");
      }
    } catch (error) {
      alert("Error de conexión: ¿Has arrancado la API con 'npm run api'?");
    }
  };

  const cambio = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <Header />
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 mb-5 fw-bold">Iniciar sesión</h1>

        <form onSubmit={entrar} className="d-flex gap-3 bg-white p-4 shadow-sm rounded">
          <input 
            name="email" 
            type="email"
            className="form-control form-control-lg" 
            placeholder="Correo (user@dam2d15.com)" 
            onChange={cambio} 
            required 
          />
          <input 
            name="password" 
            type="password" 
            className="form-control form-control-lg" 
            placeholder="Contraseña" 
            onChange={cambio} 
            required 
          />
          <button className="btn btn-secondary btn-lg rounded-pill px-5" type="submit">Entrar</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}