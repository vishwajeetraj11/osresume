import { ErrorSVG } from './SVGs';

const ErrorMessage = ({ error }: { error: string }) => (
  <div className="p-10 flex flex-col items-center justify-center bg-gray-50 col-span-full h-96">
    <ErrorSVG width="100%" />
    <h5 className="text-default mt-6 font-normal text-xl">{error}</h5>
  </div>
);

export default ErrorMessage;
