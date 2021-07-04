import { SignUp } from '@clerk/clerk-react';
import Head from 'next/head';
import { Fragment } from 'react';

const SignUpPage = () => (
	<Fragment>
		<Head>
			<title>Sign Up | OS Resume</title>
		</Head>
		<SignUp path='/sign-up' routing='path' />
	</Fragment>
);

export default SignUpPage;
