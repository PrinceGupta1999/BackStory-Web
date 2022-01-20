import { createTheme } from '@mui/material/styles';

// Create a theme instance.
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fff9c4',
    },
    secondary: {
      main: '#4b2c20',
    },
    background: {
      default: '#fffff7',
    },
    info: {
      main: '#fff8e1',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiTextField: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiRadio: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#102027',
    },
    secondary: {
      main: '#ffa726',
    },
    background: {
      default: '#1b1b1b',
      paper: '#383838',
    },
    info: {
      main: '#102027',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
        color: 'primary',
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiTextField: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiRadio: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },
});
