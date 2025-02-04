import React from "react";
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import About from "./components/About/about";
import AddToCart from "./components/Add To Cart/addtocart";
import SignUp from "./components/Authentication/signup";
import Login from "./components/Authentication/login";
import Profile from "./components/Profile/profile";
import MyOrder from "./components/Orders/myorder";
import AddNewPainting from "./components/Admin/addnewpainting";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products" Component={Product} />
        <Route path="/About" Component={About} />
        <Route path="/Add-To-Cart" Component={AddToCart} />
        <Route path="/SignUp" Component={SignUp} />
        <Route path="/Login" Component={Login} />
        <Route path="/Profile" Component={Profile} />
        <Route path="/MyOrder" Component={MyOrder} />
        <Route path="/AddNewPainting" Component={AddNewPainting} />

        <Route path="*" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
