import React, { useEffect, useState, useContext } from "react";
import Title from "./Title";
import NavBar from "./NavBar";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function CartPage({ orders, setOrders }) {
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const { users, setUsers } = useContext(UserContext);

  const nav = useNavigate();

  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [ccv, setCcv] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  function payment() {
    const cart = users.find((user) => user.cart.length);
    console.log(cart);

    if (!cart) {
      return alert("You need to add products first");
    }

    setShowPayment(true);
  }

  function send() {
    const regexNum = /^[0-9]+$/;
    if (cardNumber.length < 16 || !regexNum.test(cardNumber)) {
      return alert("error");
    } else if (!date) {
      return alert("date error");
    } else if (ccv.length < 3 || !regexNum.test(ccv)) {
      return alert("ccv error");
    } else {
      const newId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;

      const user = users.find((user) => user.status === true);

      const order = {
        id: newId,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        cart: user.cart,
        quantity: user.cart.length,
        totalPrice: user.totalPrice,
      };

      const updateOrders = [...orders, order];

      setOrders(updateOrders);

      localStorage.setItem("orders", JSON.stringify(updateOrders));

      setShowMsg(true);

      setTimeout(() => {
        const updatedUsers = users.map((u) => (u.status === true ? { ...u, cart: [], totalPrice: 0 } : u));

        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        nav("/");
      }, 3000);
    }
  }

  console.log(orders);

  function removeFromCart(itemIndex) {
    const updatedUsers = users.map((user) => {
      if (user.status === true) {
        const updatedCart = user.cart.filter((_, index) => index !== itemIndex);
        const updatedTotalPrice = updatedCart.reduce((sum, item) => sum + item.price, 0);

        return {
          ...user,
          cart: updatedCart,
          totalPrice: updatedTotalPrice,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const currentUser = updatedUsers.find((user) => user.status === true);
    if (currentUser.cart.length === 0) {
      setShowPayment(false);
    }
  }

  const currentUser = users.find((user) => user.status === true) || { cart: [], totalPrice: 0 };

  return (
    <>
      <Title />
      <NavBar users={users} setUsers={setUsers} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Cart page</h1>
        <table border="1">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.cart.map((item, itemIndex) => (
              <tr key={itemIndex}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₪{item.price}</td>
                <td>
                  <button onClick={() => removeFromCart(itemIndex)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total Price: ₪{currentUser.totalPrice}</h3>
        <button onClick={payment}>Procced to Checkout</button>
        {showPayment && (
          <div className="col">
            <span>
              <label>Card number: </label>
              <input type="text" placeholder="Card number" maxLength={16} onChange={(e) => setCardNumber(e.target.value)} />
            </span>
            <span>
              <label>Date: </label>
              <input type="date" onChange={(e) => setDate(e.target.value)} />
            </span>
            <span>
              <label>CCV: </label>
              <input type="text" placeholder="CCV" maxLength={3} onChange={(e) => setCcv(e.target.value)} />
            </span>
            <span>
              <button onClick={send}>Complete Order</button>
            </span>
            {showMsg && (
              <span>
                <p>Order Completed!</p>
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}
