import { SignIn } from '@clerk/clerk-react';
import { Fragment } from 'react';
import Head from 'next/head';

const SignInPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Sign In | OS Resume</title>
			</Head>
			<SignIn path='/sign-in' routing='path' />
		</Fragment>
	);
};

export default SignInPage;
