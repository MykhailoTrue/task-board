import { FC, PropsWithChildren } from 'react';
import classes from './ModalWindow.module.css';

interface ModalWindowProps {
  opened: boolean;
  onClose: () => void;
}

const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = ({
  opened,
  onClose,
  children,
}) => {
  const rootClasses = [classes.modal];
  if (opened) {
    rootClasses.push(classes.active);
  }

  return (
    <div id="el" className={rootClasses.join(' ')} onClick={onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
