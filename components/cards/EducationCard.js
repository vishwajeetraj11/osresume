import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

const EducationCard = ({ institution, startedAt, endedAt, major, onDelete, openEditEduForm, country, educationActive, id }) => (
  <>
    <div className="flex justify-between items-center">
      <p className="font-light text-lg">{institution}</p>
      <p className="text-xs font-normal">
        {`${startedAt} `}
        &mdash;
        {` ${endedAt}`}
      </p>
    </div>
    <p className="text-sm font-medium tracking-wide mt-1 mb-0.5">
      {`${major} `}
      &bull;
      {` ${country}`}
    </p>
    <div
      className="mt-3 -mb-2"
      style={{ maxHeight: `${educationActive[id] ? '60px' : '0px'}`, transition: 'all 0.5s', overflow: 'hidden' }}
    >
      <button type="button" onClick={() => openEditEduForm()} className="mr-4 inline-flex items-center text-sm text-white">
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

export default EducationCard;
