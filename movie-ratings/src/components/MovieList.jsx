import { React } from "react";

export default function MovieList({ movies, setSelectedMovie, selectMovie }) {
  const sortedMovies = [...movies].sort((a, b) => b.avgRating - a.avgRating);

  return (
    <div className="movie-list-container">
    {sortedMovies.slice(0, 3).map((el, index) => (
      <div
        key={index}
        onClick={() => setSelectedMovie(el)}
        className="movie-list cursor-pointer relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-110"
      >
        <img src={el.movieUrl} alt={el.movieName} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full text-white text-center py-2">{el.movieName}</div>
      </div>
    ))}
  </div>
  );
}
