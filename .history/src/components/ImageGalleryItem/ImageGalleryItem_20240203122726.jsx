import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import ImageModal from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    selectedImage: null,
  };

  handleOpenModal = () => {
    this.setState({
      selectedImage: this.props.largeImageURL,
    });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { selectedImage } = this.state;
    const { webformatURL, tags } = this.props;

    return (
      <li className={css.imageGalleryItem} onClick={this.handleOpenModal}>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
        <ImageModal
          modalClose={this.handleCloseModal}
          modalOpen={selectedImage !== null}
          image={selectedImage}
        />
      </li>
    );
  }
}
