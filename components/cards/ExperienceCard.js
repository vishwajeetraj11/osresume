import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

const ExperienceCard = ({
  designation,
  startedAt,
  endedAt,
  company,
  description,
  onDelete,
  openEditExpForm,
  country,
  experienceActive,
  id,
}) => (
  <>
    <div className="flex justify-between items-center">
      <p className="font-light text-lg">{designation}</p>
      <p className="text-xs font-normal">
        {`${startedAt} `}
        &mdash;
        {` ${endedAt}`}
      </p>
    </div>
    <p className="text-sm font-medium tracking-wide mt-1 mb-0.5">
      {`${company} `}
      &bull;
      {` ${country}`}
    </p>
    <p className="text-xs font-light tracking-wide mt-1 mb-0.5">
      {description.length > 180 ? `${description.slice(0, 180)}...` : description}
    </p>
    <div
      className="mt-3 -mb-2"
      style={{ maxHeight: `${experienceActive[id] ? '60px' : '0px'}`, transition: 'all 0.5s', overflow: 'hidden' }}
    >
      <button type="button" onClick={() => openEditExpForm()} className="mr-4 inline-flex items-center text-sm text-white">
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

export default ExperienceCard;
