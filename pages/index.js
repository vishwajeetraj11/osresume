import Head from 'next/head';
import React, { Fragment } from 'react';

export default function Home() {
	return (
		<Fragment>
			<Head>
				{/* <title>{username ? username : ''} | Resume Editor</title> */}
				<title>OS Resume | Edit Resume like a Pro.</title>
				<meta
					property='og:title'
					content='OS Resume: Online Resume Builder – Free Download'
				></meta>
				<meta
					property='og:description'
					content='The best free online resume builder that’ll land you interviews. Create a professional resume in minutes. Download or print your resume for free.'
				></meta>
				<meta property='og:type' content='website'></meta>
				<meta property='og:site_name' content='OS Resume'></meta>
				<meta
					property='og:url'
					content='https://osresume.vercel.com/'
				></meta>
			</Head>
			<div className='max-w-screen-lg mx-auto'>
				<h1>Landing Page</h1>
			</div>
		</Fragment>
	);
}
