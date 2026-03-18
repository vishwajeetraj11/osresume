import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

const ExtrasCard = ({ title, type, items, onDelete, openEditExtForm, extraActive, id }) => (
  <>
    <div className="flex justify-between items-center">
      <p className="font-light text-lg">{title}</p>
      <p className="text-xs font-normal">{type}</p>
    </div>
    {/* <p className='text-xs font-light tracking-wide mt-1 mb-0.5'> */}
    {items.map((e, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <p className="capitalize text-gray-50 font-light text-t1-sm leading-6" key={index}>
        {e}
      </p>
    ))}
    {/* </p> */}
    <div className="mt-3 -mb-2" style={{ maxHeight: `${extraActive[id] ? '60px' : '0px'}`, transition: 'all 0.5s', overflow: 'hidden' }}>
      <button type="button" onClick={() => openEditExtForm()} className="mr-4 inline-flex items-center text-sm text-white">
        <Pencil className="h-4 w-4 text-white" />
        <span className="ml-2 capitalize">Edit</span>
      </button>
      <button type="button" onClick={() => onDelete({ id })} className="inline-flex items-center text-sm text-white">
        <Trash2 className="h-4 w-4 text-white" />
        <span className="ml-2 capitalize">Delete</span>
      </button>
    </div>
  </>
);

export default ExtrasCard;
