import { SignUp } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';

const SignUpPage = () => (
  <>
    <Head>
      <title>Sign Up | OS Resume</title>
    </Head>
    <SignUp />
  </>
);

export default SignUpPage;
