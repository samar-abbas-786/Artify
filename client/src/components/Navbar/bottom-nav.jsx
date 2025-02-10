import { FaPaintBrush } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../Context/authContext";
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
  const { selected, setSelected } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const getAddedCart = async () => {
    const response = await axios.get(
      `https://artify-backend-ra4w.onrender.com/api/cart/getAddtocart?userID=${user._id}`
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
        onClick={() => setSelected("Home")}
        to={"/"}
        className={`text flex   ${
          selected == "Home" ? "text-[#FCB080]" : "null"
        } flex-col items-center font-serif hover:text-[#FCB080] font-[300]`}
      >
        <FaHome className="text-lg" />
        Home
      </Link>
      <Link
        onClick={() => setSelected("Shop")}
        to={"/products"}
        className={`text ${
          selected == "Shop" ? "text-[#FCB080]" : "null"
        } flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]`}
      >
        <PiDiamondsFourBold className="text-lg" />
        Shop
      </Link>
      <Link
        onClick={() => setSelected("About")}
        to={"/About"}
        className={`text flex  ${
          selected == "About" ? "text-[#FCB080]" : "null"
        }  flex-col items-center font-serif hover:text-[#FCB080] font-[300]`}
      >
        <RiFolderInfoFill className="text-lg " />
        About
      </Link>
      {/* <Link className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]">
        <CiCalculator1 className="text-lg" />
        Contact
      </Link> */}
      {user != undefined ? (
        <Link
          onClick={() => setSelected("Profile")}
          className={`text flex ${
            selected == "Profile" ? "text-[#FCB080]" : ""
          } flex-col items-center font-serif hover:text-[#FCB080] font-[300]`}
          to={"/Profile"}
        >
          {" "}
          <CgProfile size={20} />
          Profile
        </Link>
      ) : (
        <Link
          onClick={() => setSelected("Login")}
          to={"/Login"}
          className={`text ${
            selected == "Login" ? "text-[#FCB080]" : ""
          } font-serif hover:text-[#FCB080] font-[300]`}
        >
          Login
        </Link>
      )}
      <Link
        to={"/Add-To-Cart"}
        onClick={() => setSelected("Cart")}
        className={`text flex ${
          selected == "Cart" ? "text-[#FCB080]" : ""
        }   flex-col items-center font-serif hover:text-[#FCB080] font-[300]`}
      >
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={count} color="warning">
            <IoCartOutline
              className={`text-black  ${
                selected == "Cart" ? "text-[#FCB080]" : ""
              } hover:text-[#FCB080]  h-[25px] w-[25px]`}
            />
          </StyledBadge>
        </IconButton>
      </Link>
    </div>
  );
};

export default BottomNavbar;
