import React from 'react';

const TemplateCard = ({ template, selected, onSelect }) => {
  const previewSrc = template.templateName === 'ClassicAts' ? '/templates/ClassicAts.svg' : `/templates/${template.templateName}.jpg`;

  return (
    <div
      onClick={() => onSelect(template)}
      onKeyUp={() => onSelect(template)}
      role="button"
      tabIndex={0}
      className={`shadow-xl hover:shadow-lg transform translate-y-0 hover:-translate-y-2 transition-all delay-200 relative ${selected ? 'border-solid border-4 border-primary' : ''
        }`}
    >
      <img src={previewSrc} draggable={false} alt={`Template ${template.title} Preview`} className="w-full aspect-[2/3] object-contain bg-white" />
      <div className="absolute bottom-0 w-full bg-gray-50">
        <h2 className="text-lg py-1 font-regular text-default text-center">{template.title}</h2>
      </div>
    </div>
  );
};

export default TemplateCard;
