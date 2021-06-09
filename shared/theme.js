import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'*': {
					'scrollbar-width': 'thin',
				},
				'*::-webkit-scrollbar': {
					width: '15px',
					height: '15px',
				},
				'*::-webkit-scrollbar-track': {
					background: '#f4f4f4',
				},
				'*::-webkit-scrollbar-thumb': {
					background: '#16a085',
				},
				'*::-webkit-scrollbar-thumb:hover': {
					background: '#1abc9c90',
				},
			},
		},
	},
	breakpoints: {
		values: {
			xs: 300,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			'2xl': 1536,
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
