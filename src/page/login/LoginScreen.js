import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { useStylesLogin, CssTextField } from '../../styles/styles';
// import { Alert } from '@material-ui/lab';
// import '../../styles/globalCss.css';
// import { postLogin } from '../../api/api';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../../redux/actions/action';
import { useStylesLogin, CssTextField, DivCustomRight } from '../../styles/Styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Backdrop, Button, CircularProgress, Container, CssBaseline, IconButton, InputAdornment, Paper, Snackbar, Typography } from '@mui/material';





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

    // const dispatch = useDispatch();

    //---------------------------------ruta de redireccion
    let history = useNavigate();

    useEffect(() => {
        soportaHuellas();
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


    //-----------------------------evento de iniciar sesion
    const handleSubmit = (e) => {
        e.preventDefault();


        //usar trim para eliminar espacios en blanco
        if (userName.trim() === '' || password.trim() === '') {
            setOpen(true);
            setSeverity('error');
            setMensaje('Ingrese usuario y contraseña');
        } else {
            //-----------------------------datos de login para enviar a backend
            let body = {};
            body.usernameOrEmail = userName;
            body.password = password;

            setCargando(true);

            // postLogin(body)
            //     .then(response => {
            //         if (response.data.status === "Activo") {
            //             localStorage.setItem('dataUser', JSON.stringify(response.data));
            //             // setTimeout(() => setCargando(false), 2000);
            //             setCargando(false);
            //             setOpen(true);
            //             setSeverity('success');
            //             setMensaje(response.data.mensaje);
            //             setUserName("");
            //             setPassword("");

            //             setTimeout(() => dispatch(setToken(response.data)), 1150);

            //         } else {
            //             setOpen(true);
            //             setSeverity('error');
            //             setMensaje("Usuario inactivo, contacte al administrador");
            //             setCargando(false);
            //         }

            //     })
            //     .catch(error => {
            //         console.log("errorSesion", error);
            //         setOpen(true);
            //         setSeverity('error');
            //         setMensaje(error.mensaje);
            //         setCargando(false);
            //     })
        }
    }

    //-----------------------------------------enviar datos con enter
    const eventEnter = (e) => {
        console.log("e", e.keyCode)
        if (e.keyCode === 13 && password.trim() !== '' && userName.trim() !== '') {
            handleSubmit(e);
        } else {
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className={classes.imagFondoLogin}>
            <div className={classes.centrarDiv}>
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

                    <Paper className={classes.paper}>
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

                            <div className={classes.buttonSpacing}>
                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    Iniciar sesión
                                </Button>


                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    variant="contained"
                                    className={classes.buttonCrearCuenta}
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
                {/* <Alert onClose={handleClose} severity={severity} elevation={6} variant="filled" >
                    {mensaje}
                </Alert> */}
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