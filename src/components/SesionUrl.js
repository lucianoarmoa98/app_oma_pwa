import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { db } from './db';

function SesionUrl() {
    const [urlData, setUrlData] = useState('');
    const [installApp, setInstallApp] = useState(false);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            // Prevent the mini-infobar from appearing on mobile.
            event.preventDefault();
            console.log("👍", "beforeinstallprompt", event);
            // Stash the event so it can be triggered later.
            window.deferredPrompt = event;
            // Remove the 'hidden' class from the install button container.
            setInstallApp(true);
        });
    }, []);

    //descargar el archivo pwa
    async function downloadApp() {
        console.log("👍", "butInstall-clicked");
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
            // The deferred prompt isn't available.
            console.log("oops, no prompt event guardado en window");
            return;
        }
        // Show the install prompt.
        promptEvent.prompt();
        // Log the result
        const result = await promptEvent.userChoice;
        console.log("👍", "userChoice", result);
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        window.deferredPrompt = null;
        // Hide the install button.
        setInstallApp(false);
    }

    const getUpdateDexie = (e) => {

        let body = {}
        body.direccion = urlData;
        //se obtiene datos de los establecimientos
        //db.establecimientos.clear();
        db.establecimientos.bulkAdd(body);
    }


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '5%', marginTop: '2%' }}>
                {installApp &&
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={downloadApp}
                    >
                        Descargar
                    </Button>
                }
            </div>

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

        </div>
    );
}

export default SesionUrl;