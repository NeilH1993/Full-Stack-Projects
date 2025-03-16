import React, { useState, useContext } from "react";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();
  const { users, setUsers } = useContext(UserContext);

  function send() {
    const emailFound = users.find((user) => email === user.email);
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    const checkNumber = password.split("").some((el) => !isNaN(el));
    const checkLowerCase = password.split("").some((el) => el === el.toLowerCase() && el !== el.toUpperCase());
    const checkUpperCase = password.split("").some((el) => el === el.toUpperCase() && el !== el.toLowerCase());

    if (!firstName || !lastName) {
      alert("error");
    } else if (!email || !email.includes("@")) {
      alert("email error");
    } else if (emailFound) {
      alert("email exist");
    } else if (password.length < 7) {
      alert("need to be at least 7 characters");
    } else if (!checkLowerCase) {
      alert("need at least one letter");
    } else if (!checkUpperCase) {
      alert("need at least one capital letter");
    } else if (!checkNumber) {
      alert("need at least one number");
    } else if (!regex.test(password)) {
      alert("need at least one special character");
    } else if (password !== confirmPassword) {
      alert("password doesn't match with confirm password");
    } else {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        cart: [],
        totalPrice: 0,
        status: true,
      };
      const updateUsers = [...users, user];
      setUsers(updateUsers);
      localStorage.setItem("users", JSON.stringify(updateUsers));
      nav("/home");
    }
  }

  console.log(users);

  return (
    <>
      <Title />
      <div className="col">
        <h2>Sign-Up</h2>
        <span>
          <label>Fisrt Name: </label>
          <input
            type="text"
            placeholder="FirstName"
            onChange={(e) => setFirstName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
          />
        </span>
        <span>
          <label>Last Name: </label>
          <input
            type="text"
            placeholder="LastName"
            onChange={(e) => setLastName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
          />
        </span>
        <span>
          <label>Email: </label>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </span>
        <span>
          <label>Password: </label>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </span>
        <span>
          <label> Confirm Password: </label>
          <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
        </span>

        <span>
          <button onClick={send}>SignUp</button>
        </span>
      </div>
    </>
  );
}
