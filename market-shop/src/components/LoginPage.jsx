import React, { useState, useEffect, useContext } from "react";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const { users, setUsers } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [setUsers]);

  const nav = useNavigate();

  console.log(users);

  function send() {
    const emailFound = users.find((user) => email === user.email);
    const passwordFound = users.find((user) => password === user.password);

    if (!emailFound) {
      alert("email or password error");
    } else if (!passwordFound) {
      alert("email or password error");
    } else {
      const updatedUsers = users.map((el) => {
        if (el.email === email) {
          return { ...el, status: true };
        } else {
          return el;
        }
      });

      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      nav("/home");
    }
  }

  return (
    <>
      <Title />
      <NavBar users={users} setUsers={setUsers} />
      <div className="col">
        <h2>Login</h2>
        <span>
          <label>Email: </label>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </span>
        <span>
          <label>Password: </label>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </span>
        <span>
          <button onClick={send}>Login</button>
          <button onClick={() => nav("/signup")}>SignUp</button>
        </span>
      </div>
    </>
  );
}
