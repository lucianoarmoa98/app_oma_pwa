import React, { useEffect, useState } from 'react';
//import { db } from './db';
import { DivCustom, DivCustomRight } from '../styles/Styles';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

function SesionUrl() {
    const [urlData, setUrlData] = useState('');
    const [installApp, setInstallApp] = useState(false);

    //---------------------------------ruta de redireccion
    let history = useNavigate();
    


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

    //agrega la url a la base de datos => dexie
    const getUpdateDexie = async (e) => {

        let body = {}
        body.direccion = urlData;

        // try {
        //     await db.url.add({
        //         urlData
        //     });
        // } catch (error) {
        //     //console.log("👍", "error", error);
        // }

        //redirecciona a home
        localStorage.setItem('dataStorage', JSON.stringify(body));
        history('/inicio');
        //console.log("agrega-body", body);

    }



    return (
        <div>
            <DivCustomRight>
                {installApp &&
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={downloadApp}
                    >
                        Descargar
                    </Button>
                }
            </DivCustomRight>


            <DivCustom>
                <TextField
                    label="Ingresar url"
                    value={urlData}
                    onChange={(e) => setUrlData(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={getUpdateDexie}
                    sx={{
                        marginTop: '2%',
                        marginBottom: '2%',
                        height: '5%',
                        backgroundColor: '#00a8ff',
                        color: '#fff',
                    }}
                >
                    Enviar
                </Button>
            </DivCustom>
        </div>
    );
}

export default SesionUrl;