import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function NavBar() {
  const { users, setUsers } = useContext(UserContext);

  const user = users.find((user) => user.status === true);

  function logOut() {
    const updatedUsers = users.map((el) => ({ ...el, status: false }));
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log(updatedUsers);
  }

  function loginReq(event) {
    if (!user) {
      event.preventDefault();
      alert("You need to log in first");
    }
  }

  const quantity = users.map((user) => user.cart.length);

  return (
    <>
      <div className="row" style={{ justifyContent: "space-evenly" }}>
        {user ? (
          <>
            <span>
              <Link to={`/profile/${user.firstName}`}>Profile</Link>
            </span>
            <span>
              <Link onClick={logOut} to={"/"}>
                LogOut
              </Link>
            </span>
          </>
        ) : (
          <span>
            <Link to={"/"}>Login</Link>
          </span>
        )}
        <span>
          <Link onClick={loginReq} to={"/home"}>
            Home
          </Link>
        </span>
        <span>
          <Link onClick={loginReq} to={"/cart"}>
            Cart ({quantity})
          </Link>
        </span>
      </div>
    </>
  );
}
