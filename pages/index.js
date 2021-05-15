import Head from 'next/head';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import FloatingPrint from '../components/floatingPrint';
import Resume from '../components/templates/Resume';
import { useReactToPrint } from 'react-to-print';
import React, { useRef } from 'react';

import { LOGOUT } from '../redux/actionTypes/userActionTypes';
import { login } from '../redux/actions/userActions';
import LeftSideBar from '../components/LeftSideBar';

export default function Home() {
	const resumeData = useSelector((state) => state.resume.data);
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
		<div className='flex justify-around'>
			<LeftSideBar />
			<FloatingPrint onClick={handlePrint} />
			<Resume ref={resumeRef} data={resumeData} />
		</div>
	);
}
