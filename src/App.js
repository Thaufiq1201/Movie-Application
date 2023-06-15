import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard';
import FacebookLogin from 'react-facebook-login';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { animateScroll as scroll } from 'react-scroll';

function MovieList({ movies, searchQuery }) {
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="movie-list">
      <TransitionGroup className="movie-list__container">
        {filteredMovies.map((movie) => (
          <CSSTransition key={movie.id} timeout={500} classNames="fade">
            <MovieCard movie={movie} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    setIsVisible(scrollTop > 0);
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      smooth: true,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      Go back to top
    </button>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=993398c146309eb459691092d8fd6f94'
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFacebookResponse = (response) => {
    // Handle the Facebook login response here
    console.log(response);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="app-title">Movie App</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        <FacebookLogin
          appId="590847583164798"
          autoLoad={false}
          fields="name,email,picture"
          callback={handleFacebookResponse}
          className="facebook-login-button"
        />
      </header>
      <MovieList movies={movies} searchQuery={searchQuery} />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
