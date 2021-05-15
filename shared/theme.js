import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
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
