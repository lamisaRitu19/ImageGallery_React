import React, { useContext, useRef } from "react";
import "./Photo.css";
import { PhotoContext } from "../context/PhotoProvider";

const Photo = (
  {
    _id,
    path,
    index,
    dragPhoto,
    draggedOverPhoto,
    handleStartDrag,
    handleEnterDrag,
    handleSort,
  },
  ref
) => {
  const { deleteImageList, setDeleteImageList } = useContext(PhotoContext);
  const inputRef = useRef(null);

  // function triggered when any image is checked/unchecked
  const checkImage = () => {
    const checkboxChecked = inputRef.current.checked;
    const imgContainerId = inputRef.current.parentNode.parentNode.id;

    if (checkboxChecked) {
      inputRef.current.parentNode.previousElementSibling.classList.add(
        "imgOpacity"
      );
      inputRef.current.parentNode.classList.add("inputOpacity");

      // checked image is added in the deleteImages list
      const delImages = [...deleteImageList, imgContainerId];
      setDeleteImageList(delImages);
    } else {
      inputRef.current.parentNode.previousElementSibling.classList.remove(
        "imgOpacity"
      );
      inputRef.current.parentNode.classList.remove("inputOpacity");

      // unchecked image is deducted from the deleteImages list
      const delImages = deleteImageList.filter((img) => img !== imgContainerId);
      setDeleteImageList(delImages);
    }
  };

  return index === 0 ? (
    <div
      id={_id}
      ref={ref}
      className="row-span-2 col-span-2 border-2 border-slate-300 rounded-lg relative image-container mb-3 sm:mb-0"
      draggable
      onDragStart={() => handleStartDrag(index)}
      onDragEnter={() => handleEnterDrag(index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
    >
      <img src={path} alt="img" className="rounded-lg image" />
      <div className="input-container">
        <input
          ref={inputRef}
          type="checkbox"
          name=""
          id="check"
          className="w-8 h-8"
          onClick={checkImage}
        />
      </div>
    </div>
  ) : (
    <div
      id={_id}
      ref={ref}
      className="border-2 border-slate-300 rounded-lg relative image-container mb-3 sm:mb-0"
      draggable
      onDragStart={() => handleStartDrag(index)}
      onDragEnter={() => handleEnterDrag(index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
    >
      <img src={path} alt="img" className="rounded-lg image" />
      <div className="input-container">
        <input
          ref={inputRef}
          type="checkbox"
          name=""
          id="check"
          className="w-6 h-6"
          onChange={checkImage}
        />
      </div>
    </div>
  );
};

const forwardedPhoto = React.forwardRef(Photo);

export default forwardedPhoto;
