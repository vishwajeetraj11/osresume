import Head from 'next/head';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import FloatingPrint from '../components/floatingPrint';
import Resume from '../components/templates/Resume';
import { useReactToPrint } from 'react-to-print';
import React, { useRef } from 'react';

export default function Home() {
	const resumeRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => resumeRef.current,
		documentTitle: 'Vishwajeet Raj'
	});

	const printOrder = () => {
		const printableElements = document.getElementById('t1').innerHTML;
		const resume =
			'<html><head><title></title></head><body>' +
			printableElements +
			'</body></html>';
		const oldPage = document.body.innerHTML;
		document.body.innerHTML = resume;
		window.print();
		document.body.innerHTML = oldPage;
	};
	return (
		<div className='container'>
			<FloatingPrint onClick={handlePrint} />
			<Resume ref={resumeRef} />
		</div>
	);
}
