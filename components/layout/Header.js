import styles from '../../styles/Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => (
	<header className={styles.header}>
		<div className={styles.left}>
			<Link href='/'>
				<a className={styles.logo}>
					{/* <Image src='/logo.svg' width='32' height='32' alt='Logo' /> */}
					<span className={styles.appName}>OS Resume</span>
				</a>
			</Link>
		</div>
		<div className={styles.right}>
			<SignedOut>
				<Link href='/sign-in'>
					<p className='text-white cursor-pointer'>Sign in</p>
				</Link>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	</header>
);

export default Header;
