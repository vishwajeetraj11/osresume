import { useSelector } from 'react-redux';
import Resume from '../components/templates/Resume';
import { useReactToPrint } from 'react-to-print';
import React, { Fragment, useRef } from 'react';

import LeftSideBar from '../components/LeftSideBar';
import RightSideBar from '../components/RightSideBar';

const Editor = () => {
	const resumeData = useSelector((state) => state.resume.data);
	const username = resumeData.personalData.name;
	const resumeRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => resumeRef.current,
		documentTitle: 'Vishwajeet Raj',
	});

	return (
		<div className='flex flex-col lg:flex-row'>
			<LeftSideBar />
			<Resume ref={resumeRef} data={resumeData} />
			<RightSideBar handlePrint={handlePrint} />
		</div>
	);
};

export default Editor;
