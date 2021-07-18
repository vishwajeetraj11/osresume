import React from 'react';
import Header from './Header';

const Layout = ({ children, route }) => {
  const showHeader = route === '/sign-up/[[...index]]' || route === '/sign-in/[[...index]]';
  return (
    <div className="bg-white min-h-screen">
      {!showHeader && <Header route={route} />}
      <main className={`${showHeader ? 'pt-8 pb-8 min-h-screen' : ''}`}>{children}</main>
    </div>
  );
};

export default Layout;
