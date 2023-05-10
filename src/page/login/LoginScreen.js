import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { useStylesLogin, CssTextField } from '../../styles/styles';
// import '../../styles/globalCss.css';
// import { postLogin } from '../../api/api';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../../redux/actions/action';
import { useStylesLogin, CssTextField, DivCustomRight } from '../../styles/Styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Backdrop, Button, CircularProgress, Container, CssBaseline, IconButton, InputAdornment, Paper, Snackbar, Typography } from '@mui/material';





function LoginScreen({ }) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [installApp, setInstallApp] = useState(false);

    const classes = useStylesLogin();
    let altoPantalla = window.innerHeight;

    // const dispatch = useDispatch();

    //---------------------------------ruta de redireccion
    let history = useNavigate();

    useEffect(() => {
        // soportaHuellas();
    }, []);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            // Prevent the mini-infobar from appearing on mobile.
            event.preventDefault();
            console.log("👍", "se instalo", event);
            // Stash the event so it can be triggered later.
            window.deferredPrompt = event;
            // Remove the 'hidden' class from the install button container.
            setInstallApp(true);
        });
    }, []);


    const soportaHuellas = () => {
        if (navigator.credentials) {
            console.log('soporta huellas====>', navigator.credentials)
            handleCreateValidacion();
        } else {
            console.log('no soporta huellas====>')
            return false;
        }
    }

    const publicKey = {
        challenge: new Uint8Array(32),
        rp: {
            name: 'Dimo',
            id: 'localhost'
        },
        user: {
            id: new Uint8Array(16),
            name: 'Dimo',
            displayName: 'Dimo'
        },
        pubKeyCredParams: [
            {
                type: 'public-key',
                alg: -7
            },
            {
                type: 'public-key',
                alg: -257
            }
        ],
    }

    const credentialCreacionOptions = {
        publicKey: publicKey
    }

    const handleCreateValidacion = () => {
        navigator.credentials.get(credentialCreacionOptions)
            .then((newCredentialInfo) => {
                console.log('newCredentialInfo====> Datos', newCredentialInfo)
                // Enviar newCredentialInfo al servidor para registrarla
            })
            .catch((err) => {
                console.log('err====>Huellas', err)
                // Manejar errores
            });

        //utilizar internal para autenticar con huella
        // navigator.credentials.get({
        //     publicKey: {
        //         // Relying Party (RP)
        //         rp: {
        //             name: 'Dimo',
        //             // id: 'localhost'
        //             id:'https://dulcet-zabaione-72320c.netlify.app'
        //         },
        //         // User
        //         user: {
        //             id: new Uint8Array(16),
        //             name: 'Dimo',
        //             displayName: 'Dimo'
        //         },
        //         // Challenge
        //         challenge: new Uint8Array(32),
        //         // Algoritmos de firma
        //         pubKeyCredParams: [
        //             {
        //                 type: 'public-key',
        //                 alg: -7
        //             }
        //         ],
        //         // Timeout
        //         timeout: 60000,
        //         //autenticacion interna por huella
        //         authenticatorSelection: {
        //             authenticatorAttachment: 'internal',
        //             userVerification: 'required'
        //         }
        //     }
        // }).then((newCredentialInfo) => {
        //     console.log('newCredentialInfo====> Datos', newCredentialInfo)
        //     // Enviar newCredentialInfo al servidor para registrarla
        // })
        //     .catch((err) => {
        //         console.log('err====>Huellas', err)
        //         // Manejar errores
        //     });

    }


    //descargar el archivo pwa
    const downloadApp = async () => {
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


    //---------------------------------cerrar modal de alerta
    const handleClose = () => {
        setOpen(false);
    };

    //-----------------------------evento de ingresar usuario
    const handleChangeUser = (e) => {
        const { value } = e.target;
        setUserName(value);
    }

    //-----------------------------evento de ingresar password
    const handleChangePas = (e) => {
        const { value } = e.target;
        setPassword(value);
    }


    // //-----------------------------evento de iniciar sesion
    // const handleSubmit = (e) => {
    //     e.preventDefault();


    //     //usar trim para eliminar espacios en blanco
    //     if (userName.trim() === '' || password.trim() === '') {
    //         setOpen(true);
    //         setSeverity('error');
    //         setMensaje('Ingrese usuario y contraseña');
    //     } else {
    //         //-----------------------------datos de login para enviar a backend
    //         let body = {};
    //         body.usernameOrEmail = userName;
    //         body.password = password;

    //         setCargando(true);

    //         // postLogin(body)
    //         //     .then(response => {
    //         //         if (response.data.status === "Activo") {
    //         //             localStorage.setItem('dataUser', JSON.stringify(response.data));
    //         //             // setTimeout(() => setCargando(false), 2000);
    //         //             setCargando(false);
    //         //             setOpen(true);
    //         //             setSeverity('success');
    //         //             setMensaje(response.data.mensaje);
    //         //             setUserName("");
    //         //             setPassword("");

    //         //             setTimeout(() => dispatch(setToken(response.data)), 1150);

    //         //         } else {
    //         //             setOpen(true);
    //         //             setSeverity('error');
    //         //             setMensaje("Usuario inactivo, contacte al administrador");
    //         //             setCargando(false);
    //         //         }

    //         //     })
    //         //     .catch(error => {
    //         //         console.log("errorSesion", error);
    //         //         setOpen(true);
    //         //         setSeverity('error');
    //         //         setMensaje(error.mensaje);
    //         //         setCargando(false);
    //         //     })
    //     }
    // }

    //validar si tiene para autenticar con huella
    const handleValidarCreateUser = () => {
        if (navigator.credentials) {
            handleCreateUser();
        } else {
            console.log('no soporta huellas====>')
            setMensaje("Hubo un error al crear el usuario, contacte al administrador");
            setOpen(true);
            setSeverity('error');
        }
    }

    //validar si tiene para autenticar con huella
    const handleValidarLoginUser = () => {
        if (navigator.credentials) {
            handleGetUser();
        } else {
            console.log('no soporta huellas====>')
        }
    }

    //obtener datos de usuario que se creo
    const handleGetUser = () => {
        //obtener la llave de acceso de la huella del localhost
        navigator.credentials.get({
            publicKey: {
                // Relying Party (RP)
                // rpId: 'localhost',
                rpId: 'testingpwa.com',
                // Challenge
                challenge: new Uint8Array(32),
                // Timeout
                timeout: 60000,
                // Algoritmos de firma
                allowCredentials: [
                    {
                        type: 'public-key',
                        id: new Uint8Array(16),
                        transports: ['internal'],
                        // transports: ['usb', 'nfc', 'ble'],
                    }
                ],
                //autenticacion interna por huella
                authenticatorSelection: {
                    authenticatorAttachment: 'internal',
                    userVerification: 'required',
                    // requireResidentKey: true
                },
            }
        }).then((assertion) => {
            console.log('assertion====> Datos', assertion)
            // Enviar assertion al servidor para autenticarla
        })
            .catch((err) => {
                console.log('err====>Huellas', err)
                // Manejar errores
            })

    }


    //crear usuario, autenticacion con huella o face id
    const handleCreateUser = () => {
        navigator.credentials.create({
            publicKey: {
                // Relying Party (RP)
                rp: {
                    // id: 'localhost',
                    name: 'https://testingpwa.com',
                    id: 'testingpwa.com'
                },
                // User
                user: {
                    id: new Uint8Array(16),
                    name: 'Dimo',
                    displayName: 'Dimo'
                },
                // Challenge
                challenge: new Uint8Array(32),
                // Algoritmos de firma
                pubKeyCredParams: [
                    {
                        type: 'public-key',
                        alg: -7
                    },
                    {
                        type: 'public-key',
                        alg: -257
                    }
                ],
                // Timeout
                timeout: 60000,
                //autenticacion interna por huella
                authenticatorSelection: {
                    authenticatorAttachment: 'internal',
                    userVerification: 'required'
                }
            }
        })
            .then((newCredentialInfo) => {
                console.log('newCredentialInfo====> Datos', newCredentialInfo)
                // Enviar newCredentialInfo al servidor para registrarla
                // const serializableCredential = {
                //     rawId: Array.from(newCredentialInfo.rawId),
                //     response: {
                //         attestationObject: Array.from(newCredentialInfo.response.attestationObject),
                //         clientDataJSON: newCredentialInfo.response.clientDataJSON,
                //     },
                //     authenticatorAttachment: newCredentialInfo.authenticatorAttachment,
                //     id: newCredentialInfo.id,
                //     type: newCredentialInfo.type,
                // };

                const serializableCredential = {};
                serializableCredential.rawId = newCredentialInfo.id;
                serializableCredential.type = newCredentialInfo.type;


                localStorage.setItem('credential', JSON.stringify(serializableCredential));
                setMensaje('Usuario creado correctamente');
                setOpen(true);
                setSeverity('success');
                //se guarda en localstorage
            })
            .catch((err) => {
                console.log('err====>Huellas', err)
                // Manejar errores
                setMensaje('Error al crear usuario');
                setOpen(true);
                setSeverity('error');
            });
    }

    //-----------------------------------------enviar datos con enter
    const eventEnter = (e) => {
        console.log("e", e.keyCode)
        if (e.keyCode === 13 && password.trim() !== '' && userName.trim() !== '') {
            // handleSubmit(e);
        } else {
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className={classes.imagFondoLogin}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // height: altoPantalla,
                height: '100vh',
                width: '100vw',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <DivCustomRight>
                        {installApp &&
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={downloadApp}
                            >
                                Descargar Pwa
                            </Button>
                        }
                    </DivCustomRight>

                    <Paper style={{
                        padding: '20px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255,255,255,0.9)',

                    }}>
                        <Typography component="h1" variant="h5" align='center'>
                            Iniciar sesion
                        </Typography>

                        <div className={classes.form} >
                            <CssTextField
                                value={userName}
                                onChange={handleChangeUser}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Ingrese su Correo"
                                id="username"
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='email'
                                autoFocus
                            />

                            <CssTextField
                                value={password}
                                onChange={handleChangePas}
                                onKeyDown={eventEnter}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                // type="password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="off"
                                autoCapitalize={'off'}
                                autoCorrect='off'
                                //habilitar ver contraseña
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}

                            />

                            <div style={{}}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '50px',
                                    width: '100%',
                                    marginTop: '10px',
                                }}>
                                    <Button
                                        fullWidth
                                        onClick={handleValidarLoginUser}
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Iniciar sesión
                                    </Button>
                                </div>


                                <Button
                                    fullWidth
                                    onClick={handleValidarCreateUser}
                                    variant="contained"
                                    className={classes.buttonCrearCuenta}
                                    color='secondary'
                                >
                                    Crear cuenta
                                </Button>
                            </div>

                            <p><b>Versión: {'0.0.1'}</b></p>

                        </div>
                    </Paper>
                </Container>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} elevation={6} variant="filled" style={{ textAlign: 'center' }} >
                    {mensaje}
                </Alert>
            </Snackbar>

            <Backdrop className={classes.backdrop} open={cargando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default LoginScreen;

// export default connect(null, { guardarText, alertInit })(Login);
// withStyles(useStylesLogin)(Login);