import { SignUp } from '@clerk/clerk-react';
import Head from 'next/head';
import React from 'react';

const SignUpPage = () => (
  <>
    <Head>
      <title>Sign Up | OS Resume</title>
    </Head>
    <SignUp path="/sign-up" routing="path" />
  </>
);

export default SignUpPage;
