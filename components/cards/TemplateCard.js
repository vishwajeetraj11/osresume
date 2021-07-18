import Image from 'next/image';
import React from 'react';

const TemplateCard = ({ template, selected, onSelect, type }) => (
  <div
    onClick={() => onSelect(template)}
    onKeyUp={() => onSelect(template)}
    role="button"
    tabIndex={0}
    className={`shadow-xl hover:shadow-lg transform translate-y-0 hover:-translate-y-2 transition-all delay-200 relative ${
      selected ? 'border-solid border-4 border-primary' : ''
    }`}
  >
    <Image
      src={`/templates/${type === 'TEMPLATE' ? template.title : template.templateName}.jpg`}
      draggable={false}
      alt={`Template ${template.title} Preview`}
      layout="responsive"
      width="300px"
      height="450px"
    />
    <div className="absolute bottom-0 w-full bg-gray-50">
      <h2 className="text-lg py-1 font-regular text-default text-center">{template.title}</h2>
    </div>
  </div>
);

export default TemplateCard;
