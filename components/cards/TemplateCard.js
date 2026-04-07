import React from 'react';

const TemplateCard = ({ template, selected, onSelect }) => {
  const previewSrc = template.templateName === 'ClassicAts' ? '/templates/ClassicAts.svg' : `/templates/${template.templateName}.jpg`;

  return (
    <div
      onClick={() => onSelect(template)}
      onKeyUp={() => onSelect(template)}
      role="button"
      tabIndex={0}
      className={`shadow-md hover:shadow-xl cursor-pointer hover:-translate-y-2 hover:scale-[1.01] transition-[transform,box-shadow,scale] duration-300 relative ${selected ? 'border-2 border-primary' : ''
        }`}
    >
      <img src={previewSrc} draggable={false} alt={`Template ${template.title} Preview`} className="w-full aspect-[210/297] object-contain object-top bg-white" />
      <div className="absolute bottom-0 w-full bg-gray-50">
        <h2 className="text-lg py-1 font-medium text-default text-center">{template.title}</h2>
      </div>
    </div>
  );
};

export default TemplateCard;
