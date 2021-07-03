import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useStore } from '../redux/store';
import { Provider, useDispatch } from 'react-redux';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';
import { useRouter } from 'next/router';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';

// MUI Setup
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../shared/theme';
import Layout from '../components/layout/Layout';

// Clerk Env
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
const clerkSignInURL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN;
const publicPages = ['/'];

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);
	const router = useRouter();

	useEffect(() => {
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
					<ClerkProvider
						frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
						navigate={(to) => router.push(to)}
					>
						<Layout>
							{publicPages.includes(router.pathname) ? (
								<Component {...pageProps} />
							) : (
								<>
									<SignedIn>
										<Component {...pageProps} />
									</SignedIn>
									<SignedOut>
										<RedirectToSignIn />
									</SignedOut>
								</>
							)}
						</Layout>
					</ClerkProvider>
				</StylesProvider>
			</ThemeProvider>
		</Provider>
	);
}

function RedirectToSignIn() {
	useEffect(() => {
		window.location = clerkSignInURL;
	});
	return null;
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
