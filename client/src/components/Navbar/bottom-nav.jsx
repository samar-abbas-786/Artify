import { FaPaintBrush } from "react-icons/fa";
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const BottomNavbar = () => {
  return (
    <div className="nav-links z-50 w-full bg-[#D5EAEC] flex text-black h-[65px] justify-evenly items-center fixed bottom-0">
      <Link className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]">
        <FaHome className="text-lg" />
        Home
      </Link>
      <Link className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]">
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
      <Link className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]">
        <CiLogin className="text-lg" />
        Login
      </Link>
      <Link className="text flex  flex-col items-center font-serif hover:text-[#FCB080] font-[300]">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={1} color="warning">
            <IoCartOutline className="text-black hover:text-[#FCB080]  h-[25px] w-[25px]" />
          </StyledBadge>
        </IconButton>
      </Link>
    </div>
  );
};

export default BottomNavbar;
