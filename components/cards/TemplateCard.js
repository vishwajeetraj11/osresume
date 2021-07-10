import Image from 'next/image';
import React from 'react';

const TemplateCard = ({ template, selected, onSelect }) => (
  <div
    onClick={() => onSelect(template)}
    onKeyUp={() => onSelect(template)}
    role="button"
    tabIndex={0}
    className={`shadow-xl hover:shadow-lg transform translate-y-0 hover:-translate-y-2 transition-all delay-200 ${
      selected ? 'border-solid border-4 border-primary' : ''
    }`}
  >
    <Image
      src="/templates/Onyx.jpg"
      //   src={`/templates/${template.title}.jpg`}
      draggable={false}
      alt={`Template ${template.title} Preview`}
      layout="responsive"
      width="300px"
      height="450px"
    />
  </div>
);

export default TemplateCard;
