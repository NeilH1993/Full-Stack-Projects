import React, { useEffect, useState, useContext } from "react";
import Title from "./Title";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProfilePage() {
  const { users, setUsers } = useContext(UserContext);
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [setUsers]);


  const currentUser = users.find((user) => user.status === true) || {};
  console.log(users);

  const [firstName, setFirstName] = useState(currentUser.firstName || "");
  const [lastName, setLastName] = useState(currentUser.lastName || "");
  const [email, setEmail] = useState(currentUser.email || "");

  function send() {
    if (!firstName || !lastName) {
      alert("error");
    } else if (!email || !email.includes("@")) {
      alert("email error");
    }

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          firstName,
          lastName,
          email,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Profile updated successfully!");
  }

  console.log(users);

  return (
    <>
      <Title />
      <NavBar users={users} setUsers={setUsers} />
      <div className="col">
        <span>
          <h2>Hi {currentUser.firstName}! 😀</h2>
        </span>
      </div>
      <div className="col">
        <span>
          <label>Fisrt Name: </label>
          <input
            type="text"
            placeholder="FirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
          />
        </span>
        <span>
          <label>Last Name: </label>
          <input
            type="text"
            placeholder="LastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
          />
        </span>
        <span>
          <label>Email: </label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </span>
        <span>
          <button onClick={send}>Edit Profile</button>
        </span>
      </div>
    </>
  );
}
