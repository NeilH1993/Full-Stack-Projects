import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigate() {
  const nav = useNavigate();
  return (
    <div className="nav">
      <button className="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-600 active:bg-blue-500 transition-all" onClick={() => nav("/")}>Home</button>
      <button className="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-600 active:bg-blue-500 transition-all" onClick={() => nav("/deletemovies")}>Delete</button>
      <button className="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-600 active:bg-blue-500 transition-all" onClick={() => nav("/searchmovies")}>Search</button>
      <button className="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-600 active:bg-blue-500 transition-all" onClick={() => nav("/addmovies")}>Add</button>
    </div>
  );
}
