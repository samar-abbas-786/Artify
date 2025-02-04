import { useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/Navbar/bottom-nav";
import Navbar from "../components/Navbar/navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Context/authContext";

const SidePart = () => {
  const [landscape, setLandscape] = useState(false);
  const [portrait, setPortrait] = useState(false);

  return (
    <div className="w-[20vw]  text-center flex flex-col items-center h-screen border-r-black border-[1px] space-y-5">
      <h1 className="text-xl font-poppins font-semibold p-5">
        Shop By Category
      </h1>
      <button
        onClick={() => setLandscape(!landscape)}
        className="text-lg font-poppins flex items-center space-x-1"
      >
        <span>Landscape</span>
        {!landscape ? (
          <HiOutlinePlus />
        ) : (
          <BsCheck2Circle className="text-green-500" />
        )}
      </button>
      <button
        onClick={() => setPortrait(!portrait)}
        className="text-lg font-poppins flex items-center space-x-1"
      >
        <span>Portrait</span>
        {!portrait ? (
          <HiOutlinePlus />
        ) : (
          <BsCheck2Circle className="text-green-500" />
        )}
      </button>
    </div>
  );
};

const Product = () => {
  // const paintings = Array(10).fill(null);

  const [Painting, setPainting] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  // const [token, setToken] = useState();
  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  // }, []);
  const handleCart = async (paintingID) => {
    try {
      // console.log(user._id);

      const response = await axios.post(
        `http://localhost:8080/cart/addToCart?paintingID=${paintingID}&userID=${user._id}`
      );
      console.log(response.data);

      toast(response.data.message);
      // window.location.reload(false);
    } catch (error) {
      console.log("error occured on handleCart");
      toast(error.message);
      // window.location.reload(false);
    }
  };

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/painting/getAllPainting"
        );
        setPainting(response.data.allPainting);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };

    fetchPaintings();
  }, []);

  return (
    <div>
      {" "}
      <Navbar />
      <div className=" w-full h-full flex-col flex justify-between">
        <div className="md:w-[20vw] w-[100vw] fixed left-0">
          {" "}
          <SidePart />
        </div>
        <div className="ml-[20vw] mt-[10px] all-images flex gap-8 justify-evenly flex-wrap p-5 w-[80vw]">
          {Painting.map((painting, index) => (
            <div key={index} className="single-image w-[20vw] border-[1px] ">
              <img
                className="w-full h-[300px] object-fill"
                src={`http://localhost:8080/uploads/${painting.image}`}
                alt={`Painting ${index + 1}`}
              />
              <div className="flex items-center justify-between px-2 text-md font-serif p-2">
                <p className="opacity-100 duration-300 group-hover:opacity-95">
                  Price :{" "}
                  <span className="text-[#FCB080]">₹{painting.price}</span>
                </p>
                <Link className="flex items-center text-[12px] font-serif  font-[300]">
                  <button
                    onClick={() => handleCart(painting._id)}
                    className="px-3 py-1 list-none rounded-sm bg-yellow-600 hover:bg-yellow-700 text-white text-[14px] font-poppins"
                  >
                    Add to cart
                  </button>{" "}
                  {/* <FiArrowRight /> */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="scr" className="md:hidden block md:pt-[100px]  ">
        {" "}
        <BottomNavbar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
