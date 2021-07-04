import Head from 'next/head';
import Image from 'next/image';
import React, { Fragment } from 'react';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>
					OS Resume | Oversimplifying Resume building experience.
				</title>
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
			<div className='landing-container bg-white'>
				<div className='max-w-screen-xl mx-auto flex flex-col lg:flex-row'>
					<div className='pl-10 lg:pl-0 h-2/4 lg:h-auto lg:w-3/6 flex flex-col justify-center'>
						<h2
							className='text-sm font-light uppercase'
							style={{ letterSpacing: '5.4px' }}
						>
							Oversimplifying
						</h2>
						<h1 className='text-7xl text-default font-medium'>
							Resume
						</h1>
						<h3 className='text-2xl font-light tracking-wider text-default'>
							Building Experience.
						</h3>
					</div>
					<div className='lg:w-3/6 grid items-center'>
						<Image
							src='/landing.png'
							layout='responsive'
							height='70%'
							width='100%'
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
