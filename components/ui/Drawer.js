import clsx from 'clsx';
import React, { useEffect } from 'react';

const Drawer = ({ open, onClose, anchor = 'left', children, panelClassName }) => {
  const isRight = anchor === 'right';
  const closedTransformClass = isRight ? 'translate-x-full' : '-translate-x-full';

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        onClose?.(event);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const panelClasses = clsx(
    'fixed top-0 bottom-0 z-50 w-full overflow-y-auto overscroll-contain bg-white shadow-xl transition-transform duration-200 ease-out',
    'sm:w-[90vw] lg:w-[50vw]',
    isRight ? 'right-0' : 'left-0',
    open ? 'translate-x-0' : closedTransformClass,
    panelClassName,
  );

  return (
    <div className={clsx('fixed inset-0 z-40', open ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!open}>
      <button
        type="button"
        aria-label="Close drawer"
        className={clsx('absolute inset-0 bg-black/40 transition-opacity duration-200', open ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={panelClasses}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
