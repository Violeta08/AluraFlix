import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul por defecto de Material-UI
    },
    secondary: {
      main: '#ff4081', // Rosa por defecto de Material-UI
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
