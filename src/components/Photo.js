import React from "react";
import "./Photo.css";

const Photo = ({ _id, path }) => {
  return _id === "img1" ? (
    <div
      id={_id}
      className="row-span-2 col-span-2 border-2 border-slate-300 rounded-lg relative image-container"
    >
      <img src={path} alt="" className="rounded-lg image" />
      <div className="input-container">
        <input type="checkbox" name="" id="check" className="w-5 h-5" />
      </div>
    </div>
  ) : (
    <div
      id={_id}
      className="border-2 border-slate-300 rounded-lg relative image-container"
    >
      <img src={path} alt="" className="rounded-lg image" />
      <div className="input-container">
        <input type="checkbox" name="" id="check" className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Photo;
