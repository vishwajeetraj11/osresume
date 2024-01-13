import spin from './loader.module.css';

const Loader = ({ fullScreen }: { fullScreen: boolean }) => (
  <div className={fullScreen ? 'h-screen w-screen flex items-center justify-center' : ''}>
    <div className={spin.spinner_3} />
  </div>
);

export default Loader;
