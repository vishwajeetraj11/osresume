import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
	breakpoints: {
		values: {
		  xs: 300,
		  sm: 640,
		  md: 768,
		  lg: 1024,
		  xl: 1280,
		  '2xl': 1536
		},
	  },
	palette: {
		primary: {
			main: '#1abc9c',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#1abc9c',
		},
	},
	typography: {
		fontFamily: 'Poppins',
	},
});
