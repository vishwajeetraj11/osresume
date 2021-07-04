import Header from './Header';

const Layout = ({ children, route }) => {
	const showHeader =
		route === '/sign-up/[[...index]]' || route === '/sign-in/[[...index]]';
	return (
		<div className='bg-white'>
			{!showHeader && <Header />}
			<main className={`${showHeader ? 'pt-8 pb-8 min-h-screen' : ''}`}>
				{children}
			</main>
		</div>
	);
};

export default Layout;
