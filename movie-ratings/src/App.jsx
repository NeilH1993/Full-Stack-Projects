import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import AddMoviesPage from "./components/AddMoviesPage";
import Title from "./components/Title";
import SearchMoviePage from "./components/SearchMoviePage";
import DeleteMoviePage from "./components/DeleteMoviePage";

function App() {
  const [movies, setMovies] = useState([
    {
      movieName: "Inception",
      movieUrl: "https://www.opensubtitles.org/gfx/thumbs/6/6/6/5/1375666-t.jpg",
      description: "A thief who steals a valuable item from a person's mind, is hired",
      movieRatings: [2, 3, 3],
      avgRating: 0,
    },
    {
      movieName: "The Shawshank Redemption",
      movieUrl: "https://www.opensubtitles.org/gfx/thumbs/1/6/1/1/0111161-t.jpg",
      description:
        "Two imprisoned men bond over a number of years, finding solace and hope in each other during their time in the harsh prison environment.",
      movieRatings: [1, 3, 3],
      avgRating: 0,
    },
    {
      movieName: "300",
      movieUrl: "https://www.opensubtitles.org/gfx/thumbs/9/4/4/6/0416449-t.jpg",
      description:
        "300 is very loosely based the 480 B.C. Battle of Thermopylae, where the King of Sparta led his army against the advancing Persians; the battle is said to have inspired all of Greece to band together against the Persians, and helped usher in the world's first democracy.",
      movieRatings: [5, 5, 3],
      avgRating: 0,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(movies[0]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage movies={movies} setMovies={setMovies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}
        />
        <Route
          path="/addmovies"
          element={<AddMoviesPage movies={movies} setMovies={setMovies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}
        />
        <Route path="/searchmovies" element={<SearchMoviePage movies={movies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />} />
        <Route
          path="/deletemovies"
          element={<DeleteMoviePage movies={movies} setMovies={setMovies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}
        />
      </Routes>
    </>
  );
}

export default App;
