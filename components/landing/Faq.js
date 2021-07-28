import { faqs } from '../../shared/contants';
import { Item } from './FaqItem';

export const Faq = () => (
  <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
    <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          OS Resume FAQs
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map(faq => (
          <Item key={faq.id} title={faq.question}>
            {faq.ans}
          </Item>
        ))}
      </div>
    </div>
  </div>
);
