import React, { useEffect, useState } from 'react';
import { items } from '../../shared/googleFonts.json';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const GoogleFontsList = ({ anchor, closeDrawer }) => {
	const [googleFonts, setGoogleFonts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [bound, setBound] = useState(20);
	const [fontsAdded, setFontsAdded] = useState([]);
	const [fontLoading, setFontLoading] = useState(false);

	useEffect(() => {
		(async () => {
			const fonts = await require('../../shared/googleFonts.json');
			setGoogleFonts(
				fonts.items.slice(page, bound).map((e) => ({
					fontFamily: e.family,
					fontID: e.family.replace(/ /g, '+'),
				}))
			);
		})();
	}, []);

	useEffect(() => {
		if (googleFonts.length !== 0) {
			if (page === 0) {
				setGoogleFonts(
					items.slice(page, bound).map((e) => ({
						fontFamily: e.family,
						fontID: e.family.replace(/ /g, '+'),
					}))
				);
			} else if (page > 0) {
				setGoogleFonts(
					items
						.slice(page * bound, page * bound + bound)
						.map((e) => ({
							fontFamily: e.family,
							fontID: e.family.replace(/ /g, '+'),
						}))
				);
			}
		}
	}, [page]);

	const handlePage = (type) => {
		if (type === 'NEXT') {
			setPage((p) => p + 1);
		} else if (type === 'PREV') {
			if (page === 0) return;
			setPage((p) => p - 1);
		}
	};

	return (
		<div className='pb-10 relative '>
			<div className='pl-10 pt-6 pb-4 flex align-center fixed top-0 bg-white z-10 w-full shadow-md'>
				<Button
					className='px-4 py-2'
					onClick={() => closeDrawer()}
					color='default'
					variant='text'
				>
					{' '}
					<ArrowBackIcon /> <p className='ml-2'>Back</p>
				</Button>
				
				<Button
					className='px-4 py-2 ml-4'
					disabled={page === 0}
					onClick={() => handlePage('PREV')}
					color='primary'
					variant='outlined'
				>
					{' '}
					<ArrowBackIosIcon /> <p className='ml-2'>Previous</p>
				</Button>

                <Button
					className='px-4 py-2 ml-4'
					onClick={() => handlePage('NEXT')}
					color='primary'
					variant='outlined'
				>
					{' '}
                    <p className='mr-2'>Next</p>
					<div style={{transform: 'rotate(-180deg)'}}><ArrowBackIosIcon /></div>
				</Button>
			</div>
			<div className='mt-24 pl-10'>
				{googleFonts.length === 0
					? 'loading'
					: googleFonts.map((font, index) => {
							const onClick = (fontFamily, fontID) => {
								console.log(fontFamily, fontID);
								let fontAvailable;
								const resume = document.getElementById('t1');

								document.fonts.ready
									.then(() => {
										setFontLoading(true);
										// Check if the font is in the system
										fontAvailable = document.fonts.check(
											`16px ${fontFamily}`
										);

										// Check if font is already added via web to avoid refetching of same font
										if (fontsAdded.length > 4) {
											const fontID =
												fontsAdded[
													fontsAdded.length - 1
												];
											setFontsAdded((p) =>
												p.filter(
													(_, i) =>
														i !==
														fontsAdded.length - 1
												)
											);
											const fontNode =
												document.getElementById(fontID);
											fontNode.remove();
										}

										// Check if the font is already available in users system to avoid fetching
										if (
											fontAvailable ||
											fontsAdded.includes(fontID)
										) {
											resume.style['fontFamily'] =
												fontFamily;
										}
										// Fetch fonts
										else {
											const head =
												document.getElementsByTagName(
													'head'
												)[0];
											const link =
												document.createElement('link');
											link.id = fontID;
											link.rel = 'stylesheet';
											link.type = 'text/css';
											link.href = `https://fonts.googleapis.com/css?family=${fontID}:wght@100;300;400;500;600;700;900`;
											link.media = 'all';
											head.appendChild(link);
											setFontsAdded((p) =>
												p.concat(fontID)
											);
											resume.style['fontFamily'] =
												fontFamily;
										}
										setFontLoading(false);
									})
									.catch((e) => console.log(e));
							};
							return (
								<div key={index} className='max-w-max'>
									<Button
										variant='outlined'
										className='mt-6'
										onClick={() =>
											onClick(
												font.fontFamily,
												font.fontID
											)
										}
									>
										<p className='capitalize'>
											{font.fontFamily}
										</p>
									</Button>
								</div>
							);
					  })}
			</div>
		</div>
	);
};

export default GoogleFontsList;
