import { useNavigate } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';
import classes from './ModalWindow.module.css';

interface ModalWindowProps {}

const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div
      id="el"
      className={`${classes.modal} ${classes.active}`}
      onClick={() => navigate('/board')}
    >
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
