import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes, ProtectedRoutesLogin } from './components/Autorizador';
import Home from './components/Home';
import LoginScreen from './page/login/LoginScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutesLogin />}>
          <Route path="/" element={<LoginScreen />} />
        </Route>


        <Route element={<ProtectedRoutes />}>
          <Route path="/inicio" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
