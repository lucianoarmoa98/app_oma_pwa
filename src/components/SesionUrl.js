import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { db } from './db';

function SesionUrl() {
    const [urlData, setUrlData] = useState('');

    const getUpdateDexie = (e) => {

        let body= {}
        body.direccion = urlData;
        //se obtiene datos de los establecimientos
        //db.establecimientos.clear();
        db.establecimientos.bulkAdd(body);
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '2%', marginTop: '10%' }}>
            <TextField
                label="Ingresar url"
                value={urlData}
                onChange={(e) => setUrlData(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '2%' }}
                onClick={getUpdateDexie}
            >
                Enviar
            </Button>
        </div>
    );
}

export default SesionUrl;