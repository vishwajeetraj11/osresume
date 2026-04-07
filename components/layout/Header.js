import { Show, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import useMediaQuery from '../../shared/utils/useMediaQuery';

const Header = ({ route }) => {
  const mobile = useMediaQuery('(max-width:400px)');
  return (
    <header className={`shadow-sm ${route === '/' ? 'bg-transparent' : ''}`}>
      <div className="max-w-screen-xl mx-auto flex justify-between py-4 px-2 sm:p-4">
        <div className="flex align-center items-center">
          <Link href="/" className="flex items-center min-h-12 py-1">
            {!mobile && <img src="/icon-192x192.png" className="h-8 w-8" width={32} height={32} alt="Logo" />}
            <span className="text-[#101214] font-semibold text-sm lg:text-base ml-3">OS Resume</span>
          </Link>
        </div>
        <nav aria-label="Primary" className="flex align-center items-center">
          <Show when="signed-out">
            <Link
              className="mr-3 inline-flex min-h-12 items-center rounded px-3 py-2 bg-primary text-white font-medium hover:bg-[#0b8a72] transition-colors duration-150"
              href="/sign-up"
            >
              <span>Sign Up</span>
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex min-h-12 items-center rounded px-3 py-2 border-primary border-2 text-primary font-medium hover:bg-primary/5 transition-colors duration-150"
            >
              <span>Sign In</span>
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/templates"
              className="text-default text-xs md:text-sm inline-flex min-h-12 items-center pr-3 lg:px-4 hover:text-[#101214] transition-colors duration-150 relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              <span>Templates</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-default text-xs md:text-sm inline-flex min-h-12 items-center pr-3 lg:px-4 hover:text-[#101214] transition-colors duration-150 relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              <span>Dashboard</span>
            </Link>
            <UserButton />
          </Show>
        </nav>
      </div>
    </header>
  );
};

export default Header;
