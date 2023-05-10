import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//--------------------------------validacion de si esta logueado, se usa para login y las rutas
export const dataLocalStorage = () => {
    let nameLocal = localStorage.getItem('credential'); 
    if (nameLocal) {
        return JSON.parse(nameLocal);
    } else {
        return null;
    }
}

export const ProtectedRoutes = () => {
    const isAuth = dataLocalStorage();
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};



//-------------------------------------validacion de login y redireccion
export const ProtectedRoutesLogin = () => {
    const isAuth = dataLocalStorage();
    return !isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/inicio" replace />
    );
};