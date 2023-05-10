import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import { Button } from '@mui/material';
// import { useLiveQuery } from 'dexie-react-hooks';
// import { db } from './db';

const Home = () => {
    const [refresPage, setRefresPage] = useState(false);

    //---------------------------------ruta de redireccion
    let history = useNavigate();

    const dataStorage = localStorage.getItem('credential');


    useEffect(() => {
        if (!dataStorage) {
            history('/');
        }

    }, [refresPage]);



    const handleRemoverLocalStorgae = () => {
        localStorage.removeItem('credential');
        setRefresPage(!refresPage);
    }



    return (
        <div style={{
            //centrar verticalmente
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '0 20px'
        }}>
            <h1>Bienvenido...</h1>

            <Button
                fullWidth
                onClick={handleRemoverLocalStorgae}
                variant="contained"
                // className={classes.buttonCrearCuenta}
                color='secondary'
            >
                Cerrar Sesion
            </Button>

        </div>
    );
};

export default Home;