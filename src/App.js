import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ProtectedRoutes, ProtectedRoutesLogin } from './components/Autorizador';
import Home from './components/Home';
import SesionUrl from './components/SesionUrl';

function App() {
  return (
    // <div>
    //   <SesionUrl />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutesLogin />}>
          <Route path="/" element={<SesionUrl />} />
        </Route>


        <Route element={<ProtectedRoutes />}>
          <Route path="/inicio" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
