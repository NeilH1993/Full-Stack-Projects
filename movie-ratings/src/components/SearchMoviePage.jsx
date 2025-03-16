import React, { useState } from "react";
import Title from "./Title";
import Navigate from "./Navigate";
import MovieList from "./MovieList";
import AllMoviesList from "./AllMoviesList";

export default function SearchMoviePage({ movies, setSelectedMovie, selectedMovie }) {
  const [search, setSearch] = useState("");
  const [multipleResults, setMultipleResults] = useState([]);

  console.log(selectedMovie);

  function checkParameters() {
    const filteredSearch = movies.filter((el) => el.movieName.includes(search));
    console.log(filteredSearch);

    if (search.length === 0) {
      alert("Movie not found");
    } else if (filteredSearch.length === 1) {
      setSelectedMovie(filteredSearch[0]);
    } else {
      setMultipleResults(filteredSearch);
      console.log(multipleResults);
    }
  }

  return (
    <div>
      <Title />
      <Navigate />
      <MovieList movies={movies} setSelectedMovie={setSelectedMovie} />
      <div className="movies-container">
        <div className="movie-description">
          <div>
            <div>
              <h2>Movie name: {selectedMovie.movieName}</h2>
              <img src={selectedMovie.movieUrl} alt="Movie Img" height={"150px"} width={"150px"} border={"1px solid black"} />
              <div>
                <h2>Description</h2>
                <p>{selectedMovie.description}</p>
              </div>
              <div className="rating-buttons">
                <button onClick={() => setMovieRatings(1)}>1</button>
                <button onClick={() => setMovieRatings(2)}>2</button>
                <button onClick={() => setMovieRatings(3)}>3</button>
                <button onClick={() => setMovieRatings(4)}>4</button>
                <button onClick={() => setMovieRatings(5)}>5</button>
                <h3>Average Rating: {selectedMovie.avgRating}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-container">
        <div className="search">
          <label>
            Search Movie
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search a movie here" />
          </label>
          <button onClick={checkParameters}>Search</button>
          {multipleResults.length > 1 && (
            <div>
              <p>Multiple results found, please select one movie below:</p>
              <select onChange={(e) => setSelectedMovie(multipleResults.find((movie) => movie.movieName === e.target.value))}>
                {multipleResults.map((el, index) => (
                  <option key={index} value={el.movieName}>
                    {el.movieName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
