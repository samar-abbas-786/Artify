import { FaPaintBrush } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoHome, IoCartOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { PiDiamondsFourBold } from "react-icons/pi";
import { RiFolderInfoFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { CiCalculator1 } from "react-icons/ci";
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

const BottomNavbar = () => {
  const [added, setAdded] = useState([]);
  const [count, setCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const getAddedCart = async () => {
    const response = await axios.get(
      `/api/cart/getAddtocart?userID=${user._id}`
    );
    if (response) {
      // console.log(response);

      setAdded(response.data.flattenedPaintings);
      setCount(response.data.flattenedPaintings.length);
      // console.log(count);
    }
  };
  useEffect(() => {
    getAddedCart();
  }, []);
  return (
    <div className="nav-links z-50 w-full bg-[#D5EAEC] flex text-black h-[65px] justify-evenly items-center fixed bottom-0">
      <Link
        to={"/"}
        className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]"
      >
        <FaHome className="text-lg" />
        Home
      </Link>
      <Link
        to={"/products"}
        className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]"
      >
        <PiDiamondsFourBold className="text-lg" />
        Shop
      </Link>
      <Link
        to={"/About"}
        className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]"
      >
        <RiFolderInfoFill className="text-lg " />
        About
      </Link>
      {/* <Link className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]">
        <CiCalculator1 className="text-lg" />
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
      <Link
        to={"/Add-To-Cart"}
        className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]"
      >
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={count} color="warning">
            <IoCartOutline className="text-black hover:text-[#FCB080]  h-[25px] w-[25px]" />
          </StyledBadge>
        </IconButton>
      </Link>
    </div>
  );
};

export default BottomNavbar;
