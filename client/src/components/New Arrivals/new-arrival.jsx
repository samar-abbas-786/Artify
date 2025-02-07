import { FiArrowRight } from "react-icons/fi";
import p1 from "../../assets/paint1.webp";
import p2 from "../../assets/paint2.webp";
import p3 from "../../assets/paint3.webp";
import p4 from "../../assets/paint4.webp";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NewArrival = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleCart = async (paintingID) => {
    try {
      if (!user) {
        navigate("/Login");

        toast.error("Please Login First");
        return;
      }
      console.log(user._id);

      const response = await axios.post(
        `/api/cart/addToCart?paintingID=${paintingID}&userID=${user._id}`
      );
      console.log(response.data);
      navigate("/Add-To-Cart");
    } catch (error) {
      // console.log("error occured on handleCart", error);
      navigate("/Add-To-Cart");

      toast.warning("Something Went Wrong");
      // window.location.reload(false);
    }
  };
  const [newPainting, setNewPainting] = useState([]);
  const getNewArrival = async () => {
    try {
      const response = await axios.get("/api/painting/getNewArrival");

      if (response) {
        setNewPainting(response.data.painting);
        console.log(newPainting);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getNewArrival();
  }, []);
  return (
    <div className=" md:h-[650px] p-10 ">
      <h1 className="font-poppins text-2xl  flex space-x-5">
        <span>New Arrival</span>
        <FiArrowRight />
      </h1>
      <p className="font-sans font-thin my-7 tracking-wider ">
        Our latest arrivals are a perfect blend of modern trends and timeless
        artistry, crafted to breathe new life into your home. Whether you’re
        looking for something bold or subtle, our collection is designed to help
        you express your unique style while keeping your space on the cutting
        edge.
      </p>

      <div className="images-section md:mt-16 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
        {newPainting &&
          newPainting.map((painting) => {
            return (
              <div className="group border-[1px] border-black block1 shadow-black w-[70vw] md:w-[20vw] md:h-[350px] bg-gray-50">
                <img
                  className="w-full h-[300px] object-fill"
                  src={`http://localhost:8080/uploads/${painting.image}`}
                  alt={painting.name}
                />
                <div className="flex items-center justify-between px-2 text-lg font-serif p-2">
                  <p className="opacity-100 duration-300 group-hover:opacity-95">
                    Price :{" "}
                    <span className="text-[#FCB080]">₹{painting.price}</span>
                  </p>
                  <button
                    onClick={() => handleCart(painting._id)}
                    className="flex items-center text-md font-serif underline font-[300]"
                  >
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewArrival;
