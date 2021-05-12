import React from 'react';

const FloatingPrint = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className='absolute right-4 mt-2 sm:mt-0 sm:ml-6 inline-block bg-teal-500 text-white text-sm font-semibold rounded-md px-3 py-2 hover:bg-teal-600 cursor-pointer'
		>
			Print
		</div>
	);
};

export default FloatingPrint;
