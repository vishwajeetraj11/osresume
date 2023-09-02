import { SignIn } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';

const SignInPage = () => (
  <>
    <Head>
      <title>Sign In | OS Resume</title>
    </Head>
    <SignIn />
  </>
);

export default SignInPage;
