import { createTheme } from '@mui/material/styles';

/** Allows configuration using `createTheme` */
declare module '@mui/material/styles' {
  interface PaletteOptions {
    link?: string;
  }
}

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
    primary: {
      main: '#fb8c00',
    },
    secondary: {
      main: '#aeea00',
    },
    warning: {
      main: '#f4511e',
    },
    background: {
      default: '#303030',
      paper: '#303030'
    },
    divider: 'rgba(255, 255, 255, 0.18)',
    link: '#64b5f6',

	},
	typography: {
		fontFamily: ['Droid Sans', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
      fontSize: '4.4rem',
    },
    h2: {
      fontSize: '3.6rem',
    },
    h3: {
      fontSize: '3.2rem',
    },
    button: {
      fontSize: '1.2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.85rem',
    }
	},
  components: {
    MuiIconButton : {
      styleOverrides: {
        root: {
          '&.metamask': {
            boxShadow: '0px 0px 5px 3px rgba(255,255,255,0.20)'
          },
          '&.Mui-disabled': {
            opacity: 0.4,
            filter: 'saturate(0)',
            '&.metamask': {
              boxShadow: '0px 0px 4px 2px rgba(255,255,255,0.18)'
            },
          },
          '&.connect-metamask': {
            borderRadius: '4px',
            backgroundColor: '#303030',
            color: '#ffffff',
            '&:hover':{
              backgroundColor: '#000'
            },
            '&:disabled':{
              backgroundColor: 'rgba(48, 48, 48, 0.8)',
              color: 'rgba(255, 255, 255, 0.7)',
              filter: 'blur(1px)'
            },
          },
        },
        colorPrimary: {
            '&.metamask': {
              boxShadow: '0px 0px 6px 4px rgba(255,255,255,0.30)'
            },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#303030',
          color: '#ffffff',
          '&:hover':{
            backgroundColor: '#000'
          },
          '&:disabled':{
            backgroundColor: 'rgba(48, 48, 48, 0.8)',
            color: 'rgba(255, 255, 255, 0.7)',
            filter: 'blur(1px)'
          }
        },
      },
    }
  }
});

export default darkTheme;