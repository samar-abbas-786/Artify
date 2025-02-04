import { FiArrowRight } from "react-icons/fi";
import p1 from "../../assets/paint1.webp";
import p2 from "../../assets/paint2.webp";
import p3 from "../../assets/paint3.webp";
import p4 from "../../assets/paint4.webp";
import { Link } from "react-router-dom";
import "../../App.css";

const NewArrival = () => {
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
        {/* Group 1 */}
        <div className="group border-[1px] border-black block1 shadow-black w-[70vw] md:w-[20vw] md:h-[350px] bg-gray-50">
          <img
            className="w-full h-[300px] object-fill"
            src={p1}
            alt="Painting 1"
          />
          <div className="flex items-center justify-between px-2 text-lg font-serif p-2">
            <p className="opacity-100 duration-300 group-hover:opacity-95">
              Price : <span className="text-[#FCB080]">₹6000</span>
            </p>
            <Link
              to={"/"}
              className="flex items-center text-md font-serif underline font-[300]"
            >
              <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Group 2 */}
        <div className="group border-[1px] border-black block1 shadow-black w-[70vw] md:w-[20vw] md:h-[350px] bg-gray-50">
          <img
            className="w-full h-[300px] object-fill"
            src={p2}
            alt="Painting 2"
          />
          <div className="flex items-center justify-between px-2 text-lg font-serif p-2">
            <p className="opacity-100 duration-300 group-hover:opacity-95">
              Price : <span className="text-[#FCB080]">₹6000</span>
            </p>
            <Link
              to={"/"}
              className="flex items-center text-md font-serif underline font-[300]"
            >
              <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Group 3 */}
        <div className="group border-[1px] border-black block1 shadow-black w-[70vw] md:w-[20vw] md:h-[350px] bg-gray-50">
          <img
            className="w-full h-[300px] object-fill"
            src={p3}
            alt="Painting 3"
          />
          <div className="flex items-center justify-between px-2 text-lg font-serif p-2">
            <p className="opacity-100 duration-300 group-hover:opacity-95">
              Price : <span className="text-[#FCB080]">₹6000</span>
            </p>
            <Link
              to={"/"}
              className="flex items-center text-md font-serif underline font-[300]"
            >
              <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Group 4 */}
        <div className="group border-[1px] border-black block1 shadow-black w-[70vw] md:w-[20vw] md:h-[350px] bg-gray-50">
          <img
            className="w-full h-[300px] object-fill"
            src={p4}
            alt="Painting 4"
          />
          <div className="flex items-center justify-between px-2 text-lg font-serif p-2">
            <p className="opacity-100 duration-300 group-hover:opacity-95">
              Price : <span className="text-[#FCB080]">₹6000</span>
            </p>
            <Link
              to={"/"}
              className="flex items-center text-md font-serif underline font-[300]"
            >
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
