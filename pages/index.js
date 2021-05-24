import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Resume from '../components/templates/Resume';
import { useReactToPrint } from 'react-to-print';
import React, { Fragment, useRef } from 'react';

import { LOGOUT } from '../redux/actionTypes/userActionTypes';
import { login } from '../redux/actions/userActions';
import LeftSideBar from '../components/LeftSideBar';
import RightSideBar from '../components/RightSideBar';

export default function Home() {
	const resumeData = useSelector((state) => state.resume.data);
	const username = resumeData.personalData.name;
	const resumeRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => resumeRef.current,
		documentTitle: 'Vishwajeet Raj',
	});

	const dispatch = useDispatch();

	React.useEffect(() => {
		const userToken = localStorage.getItem('userToken');
		if (userToken) {
			dispatch(login());
		} else {
			dispatch({ type: LOGOUT });
		}
	}, []);

	return (
		<Fragment>
		<Head>
        {/* <title>{username ? username : ''} | Resume Editor</title> */}
        <title>OS Resume | Edit Resume like a Pro.</title>
		<meta property="og:title" content="OS Resume: Online Resume Builder – Free Download"></meta>
		<meta property="og:description" content="The best free online resume builder that’ll land you interviews. Create a professional resume in minutes. Download or print your resume for free."></meta>
		<meta property="og:type" content="website"></meta>
		<meta property="og:site_name" content="OS Resume"></meta>
		<meta property="og:url" content="https://osresume.vercel.com/"></meta>
      </Head>
		<div className='flex flex-col lg:flex-row'>
			<LeftSideBar />
			<Resume ref={resumeRef} data={resumeData} />
			<RightSideBar handlePrint={handlePrint} />
		</div>
		</Fragment>
	);
}
