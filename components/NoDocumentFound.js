import React from 'react';
import { NoFilesFoundSVG } from './SVGs';

const NoDocumentFound = ({ text }) => (
  <div className="bg-primary flex flex-col items-center justify-center flex-1 col-span-full">
    <NoFilesFoundSVG width={200} height={300} />
    <h5 className="text-white text-xl font-medium pb-10 lg:ml-6">{text}</h5>
  </div>
);

export default NoDocumentFound;
