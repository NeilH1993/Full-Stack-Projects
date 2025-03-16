import { React, useEffect, useState } from "react";
import Title from "./Title";
import Navigate from "./Navigate";
import MovieList from "./MovieList";
import AllMoviesList from "./AllMoviesList";

export default function HomePage({ movies, setMovies, selectedMovie, setSelectedMovie }) {
  const [movieRatings, setMovieRatings] = useState(0);

  const ratingMessages = [null, "Rating 1 confirmed", "Rating 2 confirmed", "Rating 3 confirmed", "Rating 4 confirmed", "Rating 5 confirmed"];

  useEffect(() => {
    if (movieRatings !== 0) {
      checkMovieRatings();
    }
  }, [movieRatings]);

  function checkMovieRatings() {
    const updatedMovies = movies.map((el) => {
      if (el.movieName === selectedMovie.movieName) {
        const updatedRatings = [...el.movieRatings, movieRatings];

        const calcAvg = updatedRatings.reduce((acc, rating) => acc + rating, 0) / updatedRatings.length;
        const avg = Math.floor(calcAvg);

        return { ...el, movieRatings: updatedRatings, avgRating: avg };
      }
      return el;
    });
    setMovies(updatedMovies);

    const updateSelectedMovie = updatedMovies.find((el) => el.movieName === selectedMovie.movieName);
    setSelectedMovie(updateSelectedMovie);
  }

  console.log(movies);

  return (
    <div>
      <Title />
      <Navigate />
      <MovieList movies={movies} setSelectedMovie={setSelectedMovie} />
      <div className="movies-container">
        <div className="movie-description">
          <div className="movie-details">
            <h2 className="movie-name">Movie name: {selectedMovie.movieName}</h2>
            <img className="movie-img" src={selectedMovie.movieUrl} alt="Movie Img" />
            <div className="movie-description-text">
              <h2>Description</h2>
              <p>{selectedMovie.description}</p>
            </div>

            <div>
              <div className="rating-buttons">
                <button className="rating-btn" onClick={() => setMovieRatings(1)}>1</button>
                <button className="rating-btn" onClick={() => setMovieRatings(2)}>2</button>
                <button className="rating-btn" onClick={() => setMovieRatings(3)}>3</button>
                <button className="rating-btn" onClick={() => setMovieRatings(4)}>4</button>
                <button className="rating-btn" onClick={() => setMovieRatings(5)}>5</button>
              </div>
              <h3 className="average-rating">Average Rating: {selectedMovie.avgRating}</h3>
              {ratingMessages[movieRatings] && <p className="rating-message">{ratingMessages[movieRatings]}</p>}
            </div>
          </div>
        </div>
        <AllMoviesList movies={movies} setSelectedMovie={setSelectedMovie} />
      </div>
    </div>

    

  );
}
