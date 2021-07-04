import { useSelector } from 'react-redux';
import Resume from '../components/templates/Resume';
import { useReactToPrint } from 'react-to-print';
import React, { Fragment, useRef } from 'react';
import LeftSideBar from '../components/LeftSideBar';
import RightSideBar from '../components/RightSideBar';
import Head from 'next/head';
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
} from '@clerk/clerk-react';
import { useMediaQuery } from '@material-ui/core';

const Editor = () => {
	const desktop = useMediaQuery('(min-width:1024px)');
	const resumeData = useSelector((state) => state.resume.data);
	const username = resumeData.personalData.name;
	const resumeRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => resumeRef.current,
		documentTitle: 'Vishwajeet Raj',
		pageStyle: `
			@page {
				margin: 0;
				padding: 0;
				overflow: hidden;
				height: 0; 
			}
			@media print {
				footer {display: none;}
				header {display: none;}
				html,body {
					overflow: hidden;
					border: 1px solid white;
					height: 100%;
					page-break-after: avoid;
					page-break-before: avoid;
					margin:0;
					padding:0;
					font-size: 100%;
				}
			}
			`,
	});

	return (
		<Fragment>
			<Head>
				<title>
					{username ? `${username} | Resume` : 'Resume Editor'}
				</title>
			</Head>
			<SignedIn>
				{desktop ? (
					<div className='flex flex-col lg:flex-row bg-gray-50'>
						<LeftSideBar />
						<Resume ref={resumeRef} data={resumeData} />
						<RightSideBar handlePrint={handlePrint} />
					</div>
				) : (
					<div className=''>
						Please switch to desktop for better experience.
					</div>
				)}
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</Fragment>
	);
};

export default Editor;
