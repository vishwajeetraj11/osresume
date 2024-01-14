import Image from 'next/image';
interface ResumeTemplate {
  customStyles: {
    font: string;
    // You can add more style properties here if needed
  };
  template: boolean;
  experience: string[];
  education: string[];
  extras: string[];
  _id: string;
  userId: string;
  title: string;
  templateName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  personal: string;
  id: string;
}
interface Templatetype {
  title: string;
  templateName: string;
}

const TemplateCard = ({
  template,
  selected,
  onSelect,
  type,
}: {
  template: ResumeTemplate;
  selected: boolean;
  onSelect: (data: Templatetype) => void;
  type: string;
}) => (
  <div
    onClick={() => {
      onSelect(template);
      console.log(template);
    }}
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
      width={300}
      height={450}
    />
    <div className="absolute bottom-0 w-full bg-gray-50">
      <h2 className="text-lg py-1 font-regular text-default text-center">{template.title}</h2>
    </div>
  </div>
);

export default TemplateCard;
