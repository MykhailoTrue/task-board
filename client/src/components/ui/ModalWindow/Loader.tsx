import { IconLoader2 } from '@tabler/icons-react';

const Loader = () => {
  return (
    <div className="animate-spin h-12 w-12 ">
      <IconLoader2 className="h-full w-full" />
    </div>
  );
};

export default Loader;
