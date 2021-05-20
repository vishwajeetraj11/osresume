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
        <title>{username ? username : ''} | Resume Editor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
		<meta property="og:title" content={`${username} Resume`} key="title" />
      </Head>
		<div className='flex flex-col lg:flex-row'>
			<LeftSideBar />
			<Resume ref={resumeRef} data={resumeData} />
			<RightSideBar handlePrint={handlePrint} />
		</div>
		</Fragment>
	);
}
