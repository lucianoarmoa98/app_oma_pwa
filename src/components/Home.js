import React, { useEffect, useState } from 'react';
import '../App.css';
// import { useLiveQuery } from 'dexie-react-hooks';
// import { db } from './db';

const Home = () => {
    const [dataDexie, setDataDexie] = useState(null);

    useEffect(() => {
    }, [dataDexie]);

    useEffect(() => {
        //window.location.href = "http://216.158.235.101:8104/login";
        // dataDexie.forEach(element => {
        //     //window.location.href = element.urlData;
        //     console.log("info", element);
        // });
        //obtengo data del localstorage
        let nameLocal = localStorage.getItem('dataStorage');
        let dataLocal = JSON.parse(nameLocal);
        setDataDexie(dataLocal)
        console.log("info", dataLocal);
        //window.location.href = dataLocal.direccion;

    }, []);

    

    console.log("dataState", dataDexie)

    // const getDexie = useLiveQuery(
    //     async () => {
    //         const stockGet = await db.url.toArray()
    //         console.log("stockGet", stockGet);
    //         //setDataDexie(stockGet);
    //         return stockGet;
    //     },
    // );

    // const datos = () => {
    //    setDataDexie(getDexie);
    // }
    // console.log("dataDexie", dataDexie ? dataDexie : "no hay datos");


    return (
        <div className='embed-container'>
            {/* Ingreso a la página de inicio */}
            <iframe src='http://216.158.235.101:8104/login' title="titulo" width='100%' height='600px' />
        </div>
    );
};

export default Home;