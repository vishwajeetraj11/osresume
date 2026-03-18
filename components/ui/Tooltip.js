import clsx from 'clsx';
import React from 'react';

const placementClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const Tooltip = ({ label, placement = 'top', children }) => (
  <span className="relative inline-flex group">
    {children}
    <span
      className={clsx(
        'pointer-events-none absolute z-50 rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100',
        placementClasses[placement] || placementClasses.top,
      )}
    >
      {label}
    </span>
  </span>
);

export default Tooltip;
