import React from "react";

const Photo = ({ index, img }) => {
  return index === 0 ? (
    <div className="row-span-2 col-span-2 border-2 border-slate-300 rounded-lg">
      <img src={img} alt="" className="rounded-lg" />
    </div>
  ) : (
    <div className="border-2 border-slate-300 rounded-lg">
      <img src={img} alt="" className="rounded-lg" />
    </div>
  );
};

export default Photo;
