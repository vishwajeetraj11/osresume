import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useStore } from '../redux/store';
import { Provider } from 'react-redux';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

// MUI Setup
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './shared/theme';

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<StylesProvider injectFirst>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Component {...pageProps} />
				</StylesProvider>
			</ThemeProvider>
		</Provider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
