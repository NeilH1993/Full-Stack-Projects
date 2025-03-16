import { React, useState } from "react";
import Title from "./Title";
import Navigate from "./Navigate";
import MovieList from "./MovieList";
import { useNavigate } from "react-router-dom";

export default function AddMoviesPage({ movies, setMovies }) {
  const [movieName, setMovieName] = useState("");
  const [movieUrl, setMovieUrl] = useState("");
  const [description, setDescription] = useState("");

  const nav = useNavigate();

  function capitalizedWords(input) {
    return input
      .split(" ")
      .map((el) => {
        return el.charAt(0).toUpperCase() + el.slice(1).toLowerCase();
      })
      .join(" ");
  }

  function capitalizedFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  function checkParameters() {
    if (movieName.length === 0 || description.length === 0) {
      alert("You need to type at least one letter or number");
    } else if (!movieUrl.includes("http")) {
      alert("An URL should at least start with a http host");
    } else {
      const updatedMovies = [...movies, { movieName, movieUrl, description, movieRatings: [], avgRating: 0 }];
      setMovies(updatedMovies);
      nav("/");
      console.log(updatedMovies);
    }
  }

  return (
    <div>
      <Title />
      <Navigate />
      <MovieList movies={movies} />
      <div className="add-movies-page">
        <h2>Add a new movie</h2>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <label style={{ display: "flex" }}>
            Movie name: <input type="text" onChange={(e) => setMovieName(capitalizedWords(e.target.value))} placeholder="Enter a movie name" />
          </label>
          <label style={{ display: "flex" }}>
            Movie picture: <input type="text" placeholder="paste an URL image" onChange={(e) => setMovieUrl(e.target.value)} />
          </label>
          <label style={{ display: "flex" }}>
            Description:{" "}
            <textarea
              style={{ height: "100px", textAlign: "left", resize: "none" }}
              maxLength={200}
              type="text"
              onChange={(e) => setDescription(capitalizedFirstLetter(e.target.value))}
              placeholder="Write a description here"
            />
          </label>
        </div>
        <button style={{ marginTop: "20px" }} onClick={checkParameters}>
          Add movie
        </button>
      </div>
    </div>
  );
}
