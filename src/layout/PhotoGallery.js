import React from "react";
import Photo from "../components/Photo";
import img1 from "../assets/images/image-1.webp";
import img2 from "../assets/images/image-2.webp";
import img3 from "../assets/images/image-3.webp";
import img4 from "../assets/images/image-4.webp";
import img5 from "../assets/images/image-5.webp";
import img6 from "../assets/images/image-6.webp";
import img7 from "../assets/images/image-7.webp";
import img8 from "../assets/images/image-8.webp";
import img9 from "../assets/images/image-9.webp";
import img10 from "../assets/images/image-10.jpeg";
import img11 from "../assets/images/image-11.jpeg";
import imgIcon from "../assets/images/iconImage.png";

const PhotoGallery = () => {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];

  return (
    <div className="container bg-white border border-slate-300 rounded-xl drop-shadow mx-auto">
      {/* <div className="flex justify-between items-center border-b-2 border-slate-300 drop-shadow-sm px-8 py-6">
        <span className="text-2xl font-bold">
          <input
            type="checkbox"
            name=""
            id=""
            className="w-5 h-5 mr-4"
          />
          <span>0 File Selected</span>
        </span>
        <span className="text-red-700 text-xl font-semibold">Delete Files</span>
      </div> */}
      <div className="text-2xl font-bold border-b-2 border-slate-300 drop-shadow-sm px-8 py-6">
        Gallery
      </div>
      <div className="grid grid-cols-5 gap-7 p-10">
        {images.map((img, i) => (
          <Photo key={i} index={i} img={img}></Photo>
        ))}
        <div className="flex flex-col justify-center items-center bg-slate-50 border-2 border-slate-300 border-dashed rounded-lg">
          <img src={imgIcon} alt="" className="w-8 mb-4" />
          <p className="text-xl font-medium">Add Images</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
