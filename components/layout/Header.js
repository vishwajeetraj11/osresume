import styles from '../../styles/Header.module.scss';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => (
	<header className='shadow-sm'>
		<div className='max-w-screen-xl mx-auto flex justify-between p-4'>
			<div className={styles.left}>
				<Link href='/'>
					<a className={styles.logo}>
						{/* <Image src='/logo.svg' width='32' height='32' alt='Logo' /> */}
						<span className='text-default font-semibold text-base'>
							OS Resume
						</span>
					</a>
				</Link>
			</div>
			<div className={styles.right}>
				<SignedOut>
					<Link href='/sign-in'>
						<p className='text-default cursor-pointer px-4'>
							Sign in
						</p>
					</Link>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	</header>
);

export default Header;
