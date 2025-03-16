import React from "react";

export default function AllMoviesList({ movies, setSelectedMovie }) {
  const sortedMovies = [...movies].sort((a, b) => a.movieName - b.movieName);

  return (
    <div className="all-movies-list-container">
      <p>All movies:</p>
      {sortedMovies.map((el, index) => (
        <div key={index} onClick={() => setSelectedMovie(el)} className="all-movies-list">
          <button>
            {el.movieName}
          </button>
        </div>
      ))}
    </div>
  );
}
