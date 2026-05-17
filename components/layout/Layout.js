import React from 'react';
import Header from './Header';

const Layout = ({ children, route }) => {
  const showHeader = route === '/sign-up/[[...index]]' || route === '/sign-in/[[...index]]';
  const showFooter = !showHeader && route !== '/';
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {!showHeader && <Header route={route} />}
      <main className={`flex-1 ${showHeader ? 'pt-8 pb-8 flex justify-center items-center' : ''}`}>{children}</main>
      {showFooter && (
        <footer className="border-t border-gray-100 py-4">
          <div className="max-w-screen-xl mx-auto px-4 text-xs text-[#73808D]">OS Resume</div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
