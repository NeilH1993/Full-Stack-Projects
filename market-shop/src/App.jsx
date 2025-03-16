import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import ProfilePage from "./components/ProfilePage";
import ProductProvider from "./context/ProductContext";
import UserProvider from "./context/UserContext";
function App() {

  const [orders, setOrders] = useState([{
    id: 0
  }])

  return (
    <ProductProvider>
      <UserProvider>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage orders={orders} setOrders={setOrders} />} />
        <Route path="/profile/:firstName" element={<ProfilePage />} />
      </Routes>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
