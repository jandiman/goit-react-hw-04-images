import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { getAPI } from 'pixabay-api';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (search === '') return;

    (async () => {
      await fetchImages(search, page);
    })();
  }, [search, page]);

  const fetchImages = async (search, page) => {
    try {
      setIsLoading(true);

      const fetchedImages = await getAPI(search, page);
      const { hits, totalHits } = fetchedImages;

      console.log(hits, totalHits);

      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (page === 1) {
        toast.success(`Yahoo! We found ${totalHits} images!`);
      }

      if (page * 12 >= totalHits) {
        this.setState({ isEnd: true });
        toast("Uh-oh!, you've reached the end of search results.", {
          icon: '🚨',
        });
      }

      setImages(prevState => [...prevState, ...hits]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
      setImages([]);
    }
  };

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  console.log(search);
  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {/* Render ImageGallery Component when there is atleast one match of images */}
      {images.length >= 1 && <ImageGallery photos={images} />}

      {/* Render Button Component when there is atleast a second page or more and it's not the end of page */}
      {images.length >= 2 && !isEnd && <Button onClick={handleClick} />}
      {isLoading && <Loader />}
      {isError && toast.error('Oops, something went wrong! Reload this page!')}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
