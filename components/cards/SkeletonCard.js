import React from 'react';

const SkeletonCard = () => (
  <div className="shadow-md overflow-hidden">
    <div className="w-full aspect-[210/297] animate-shimmer" />
    <div className="bg-gray-50 py-3 flex justify-center">
      <div className="h-3 w-20 rounded animate-shimmer" />
    </div>
  </div>
);

export default SkeletonCard;
