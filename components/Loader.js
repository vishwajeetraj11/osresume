import React from 'react';
import loaderStyles from '../styles/loader.css';

const Loader = ({ fullScreen }) => (
  <div className={fullScreen ? 'h-screen w-screen flex items-center justify-center' : ''}>
    <div className={loaderStyles.spinner_3}  />
  </div>
);

export default Loader;
