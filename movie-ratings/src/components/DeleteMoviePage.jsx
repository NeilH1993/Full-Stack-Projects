import React, { useState } from "react";
import Title from "./Title";
import Navigate from "./Navigate";
import MovieList from "./MovieList";

export default function DeleteMoviePage({ movies, setMovies, setSelectedMovie }) {
  console.log(movies);
  const [deleteMovie, setDeleteMovie] = useState("");

  function checkParameters() {
    const deletedMovie = movies.filter((el) => el.movieName !== deleteMovie);
    console.log(deleteMovie);

    if (movies.length === deletedMovie.length) {
      console.log(movies.length, deletedMovie.length);

      alert("No movie found");
    } else {
      setMovies(deletedMovie);
    }
  }

  return (
    <div>
      <Title />
      <Navigate />
      <MovieList movies={movies} setSelectedMovie={setSelectedMovie} />
      <div className="delete-container">
        <div className="delete">
          <label htmlFor="">
            Enter a movie name
            <input type="text" placeholder="Type the movie that you want to delete" onChange={(e) => setDeleteMovie(e.target.value)} />
          </label>
          <button onClick={checkParameters}>Delete movie</button>
        </div>
      </div>
    </div>
  );
}
