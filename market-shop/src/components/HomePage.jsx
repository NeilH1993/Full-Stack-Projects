import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import NavBar from "./NavBar";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";

export default function HomePage() {
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const { products } = useContext(ProductContext);
  const { users, setUsers } = useContext(UserContext);

  const [sortBy, setSortBy] = useState("price");
  const [showMsg, setShowMsg] = useState(false);

  function addToCart(product) {
    const currentUser = users.find((user) => user.status === true);

    if (currentUser) {
      const updatedUsers = users.map((el) => {
        if (el.status === true) {
          const newTotalPrice = el.totalPrice + product.price;
          return { ...el, cart: [...el.cart, product], totalPrice: newTotalPrice };
        } else {
          return el;
        }
      });
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setShowMsg((el) => ({ ...el, [product.name]: true }));
      setTimeout(() => {
        setShowMsg((el) => ({ ...el, [product.name]: false }));
      }, 1000);
    }
  }
  console.log(showMsg);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    }
    if (sortBy === "type") {
      return a.type.localeCompare(b.type);
    }
  });

  return (
    <>
      <Title />
      <NavBar users={users} setUsers={setUsers} />
      <div style={{marginTop: "10px"}}>
      <label>Sort By: </label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="price">Price</option>
        <option value="type">Type</option>
      </select>
      </div>
      <div style={{ height: "50vh", marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
        {sortedProducts.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <h3>₪{product.price}</h3>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            {showMsg[product.name] && <p>Added successfully!</p>}
          </div>
        ))}
      </div>
    </>
  );
}
