import { SignIn } from '@clerk/clerk-react';
import Head from 'next/head';
import React from 'react';

const SignInPage = () => (
  <>
    <Head>
      <title>Sign In | OS Resume</title>
    </Head>
    <SignIn path="/sign-in" routing="path" />
  </>
);

export default SignInPage;
