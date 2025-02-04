import React, { useState, useEffect, useContext } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoHome, IoCartOutline } from "react-icons/io5";
import { AuthContext } from "../../Context/authContext";
import { CgProfile } from "react-icons/cg";

import axios from "axios";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Navbar = () => {
  // const { token } = useContext(AuthContext);
  const [added, setAdded] = useState([]);
  const [count, setCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const getAddedCart = async () => {
    const response = await axios.get(
      `http://localhost:8080/cart/getAddtocart?userID=${user._id}`
    );
    if (response) {
      console.log(response);

      setAdded(response.data.flattenedPaintings);
      setCount(response.data.flattenedPaintings.length);
      console.log(count);
    }
  };
  useEffect(() => {
    getAddedCart();
  }, [count]);
  return (
    <div className="md:h-[110px] h-[90px] bg-gray-50  w-full flex justify-around items-center">
      <div className="logo-name flex text-[40px] items-center space-x-2">
        <span className="  tracking-widest  font-rubikVinyl font-[600] text-[#292f2f] ">
          Artify
        </span>{" "}
        <FaPaintBrush />
      </div>
      <div className="nav-links  w-[40%] hidden md:flex justify-around items-center">
        <Link
          to={"/"}
          className="text font-serif hover:text-[#FCB080] font-[300]"
        >
          Home
        </Link>
        <Link
          to={"/products"}
          className="text font-serif hover:text-[#FCB080] font-[300]"
        >
          Shop
        </Link>
        <Link
          to={"/About"}
          className="text font-serif hover:text-[#FCB080] font-[300]"
        >
          About
        </Link>
        {/* <Link className="text font-serif hover:text-[#FCB080] font-[300]">
          Contact
        </Link> */}
        {user != undefined ? (
          <Link className="text-2xl" to={"/Profile"}>
            {" "}
            <CgProfile />
          </Link>
        ) : (
          <Link
            to={"/Login"}
            className="text font-serif hover:text-[#FCB080] font-[300]"
          >
            Login
          </Link>
        )}
        <Link to={"/Add-To-Cart"}>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={count} color="warning">
              <IoCartOutline className="text-black hover:text-[#FCB080]  h-[25px] w-[25px]" />
            </StyledBadge>
          </IconButton>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
