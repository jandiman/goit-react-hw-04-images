import Modal from 'react-modal';
import css from './Modal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ modalClose, modalOpen, image }) => {
  return (
    <Modal
      onRequestClose={modalClose}
      isOpen={modalOpen}
      contentLabel="Image Modal"
      className={css.overlay}
    >
      <div className={css.modal}>
        <img src={image} alt="" />
      </div>
    </Modal>
  );
};

export default ImageModal;
