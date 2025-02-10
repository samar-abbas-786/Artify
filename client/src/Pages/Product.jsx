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
import { useNavigate } from "react-router-dom";

// const SidePart = () => {
//   const [landscape, setLandscape] = useState(false);
//   const [portrait, setPortrait] = useState(false);

//   return (
//     <div className="w-[20vw]  text-center flex flex-col items-center h-screen border-r-black border-[1px] space-y-5">
//       <h1 className="text-xl font-poppins font-semibold p-5">
//         Shop By Category
//       </h1>
//       <button
//         onClick={() => setLandscape(!landscape)}
//         className="text-lg font-poppins flex items-center space-x-1"
//       >
//         <span>Landscape</span>
//         {!landscape ? (
//           <HiOutlinePlus />
//         ) : (
//           <BsCheck2Circle className="text-green-500" />
//         )}
//       </button>
//       <button
//         onClick={() => setPortrait(!portrait)}
//         className="text-lg font-poppins flex items-center space-x-1"
//       >
//         <span>Portrait</span>
//         {!portrait ? (
//           <HiOutlinePlus />
//         ) : (
//           <BsCheck2Circle className="text-green-500" />
//         )}
//       </button>
//     </div>
//   );
// };

const Product = () => {
  // const paintings = Array(10).fill(null);
  const navigate = useNavigate();

  const [Painting, setPainting] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  // const [token, setToken] = useState();
  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));A
  // }, []);
  const handleCart = async (paintingID) => {
    try {
      if (!user) {
        navigate("/Login");

        toast.error("Please Login First");
        return;
      }
      // console.log(user._id);

      const response = await axios.post(
        `https://artify-backend-p679.onrender.com/api/cart/addToCart?paintingID=${paintingID}&userID=${user._id}`
      );
      console.log(response.data);

      toast(response.data.message);
      // window.location.reload(false);
    } catch (error) {
      console.log("error occured on handleCart");
      toast.info(error.message);
      // window.location.reload(false);
    }
  };

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get(
          "https://artify-backend-p679.onrender.com/api/painting/getAllPainting"
        );
        setPainting(response.data.allPainting);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };

    fetchPaintings();
  }, []);

  return (
    <div className="pb-20">
      {" "}
      <Navbar />
      <div className=" w-full h-full flex-col flex justify-between">
        {/* <div className="md:w-[20vw] w-[100vw] fixed left-0">
          {" "}
          <SidePart />
        </div> */}
        <div className=" mt-[10px] all-images flex md:flex-row flex-col items-center gap-10  md:gap-8 justify-evenly flex-wrap p-5 w-full">
          {Painting.map((painting, index) => (
            <div key={index} className="single-image md:w-[20vw] w-[60vw]">
              <img
                className="w-full h-[300px] object-fill"
                src={`http://localhost:8080/uploads/${painting.image}`}
                alt={`Painting ${index + 1}`}
              />
              <div className="flex items-center justify-between px-2 bg-white text-md font-serif p-2">
                <p className="opacity-100 duration-300 group-hover:opacity-95">
                  <span className="text-[#262626] font-poppins font-[500]">
                    ₹{painting.price}
                  </span>
                </p>
                <Link className="flex items-center text-[12px] font-serif  font-[300]">
                  <button
                    onClick={() => handleCart(painting._id)}
                    className="text-gray-900 bg-gradient-to-r outline-none from-yellow-200 to-yellow-400 hover:bg-gradient-to-l hover:from-yellow-200 hover:to-yellow-500 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 font-poppins"
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
