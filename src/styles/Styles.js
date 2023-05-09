import { TextField, styled } from '@mui/material';
import imgFondo from '../assets/homeFondo.png';
import { brown } from '@mui/material/colors';

export const COLOR_BACKGROUND_VERDER_AGUA = '#48c590';
export const COLOR_BACKGROUND_VERDE_CLARO = "#e2f7ed";
export const COLOR_BACKGROUND_GRIS = "#e4e5e6";
export const COLOR_BACKGROUND_GRIS_OSCURO = "#c1c1c1";

let altoPantalla = window.innerHeight;

export const DivCustom = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '10%',
});

//div hacia la derecha
export const DivCustomRight = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '5%',
    marginTop: '2%',
});


export const useStylesLogin = styled(theme => ({
    centrarDiv: {
        // height: '100vh',
        height: altoPantalla,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        // marginTop: theme.spacing(8),
        padding: theme.spacing(3),
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        borderRadius: "14px",
        //background: "#D3D3D3",
    },
    imagFondoLogin: {
        backgroundImage: `url(${imgFondo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '100vh',
        height: altoPantalla,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        // margin: theme.spacing(3, 0, 2),
        background: brown[600],
        color: 'white',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    buttonSpacing: {
        display: 'grid',
        gap: '10px',
    },
    buttonCrearCuenta: {
        background: COLOR_BACKGROUND_VERDER_AGUA,
        color: 'white',
    }
}));


//-----------------------------contenedor de color
export const CssTextField = styled(TextField)({


    '& .MuiOutlinedInput-root': {
        "&.Mui-focused fieldset": {
            // borderColor: brown[600],
            borderColor: COLOR_BACKGROUND_VERDER_AGUA,
        },
        '&:hover fieldset': {
            // borderColor: brown[600],
            borderColor: COLOR_BACKGROUND_VERDER_AGUA,
        },
    },
    //agregar color al label
    '& .MuiInputLabel-outlined': {
        color: COLOR_BACKGROUND_GRIS_OSCURO,
    },
});