import React from 'react';

const NoDocumentFound = ({ text }) => (
  <div className="flex flex-col items-center justify-center flex-1 col-span-full py-16">
    <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">Nothing here</p>
    <h5 className="text-2xl font-bold text-[#101214] mb-2">{text || 'No documents found.'}</h5>
    <p className="text-sm text-[#73808D]">Try adjusting your search or create a new one.</p>
  </div>
);

export default NoDocumentFound;
