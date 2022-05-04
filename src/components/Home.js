import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';

const Home = () => {
    const [dataDexie, setDataDexie] = useState(null);

    useEffect(() => {
        datos();
    }, []);
    
    useEffect(() => {
        //window.location.href = "http://216.158.235.101:8104/login";
        // dataDexie.forEach(element => {
        //     //window.location.href = element.urlData;
        //     console.log("info", element);
        // });
        //obtengo data del localstorage
        let nameLocal = localStorage.getItem('dataStorage');
        let dataLocal = JSON.parse(nameLocal);
        console.log("info", dataLocal);
        window.location.href = dataLocal.direccion;

      }, []);

    const getDexie = useLiveQuery(
        async () => {
            const stockGet = await db.url.toArray()
            console.log("stockGet", stockGet);
            //setDataDexie(stockGet);
            return stockGet;
        },
    );

    const datos = () => {
       setDataDexie(getDexie);
    }
    console.log("dataDexie", dataDexie ? dataDexie : "no hay datos");


    return (
        <div>
            {/* Ingreso a la página de inicio */}
        </div>
    );
};

export default Home;