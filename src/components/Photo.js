import React, { useContext, useRef } from "react";
import "./Photo.css";
import { PhotoContext } from "../context/PhotoProvider";

const Photo = (
  { _id, path, index, dragPhoto, draggedOverPhoto, handleSort },
  ref
) => {
  const { deleteImageList, setDeleteImageList } = useContext(PhotoContext);
  const inputRef = useRef(null);

  const checkImage = () => {
    const checkboxChecked = inputRef.current.checked;
    const imgContainerId = inputRef.current.parentNode.parentNode.id;

    if (checkboxChecked) {
      inputRef.current.parentNode.previousElementSibling.classList.add(
        "imgOpacity"
      );
      inputRef.current.parentNode.classList.add("inputOpacity");

      const delImages = [...deleteImageList, imgContainerId];
      setDeleteImageList(delImages);
    } else {
      inputRef.current.parentNode.previousElementSibling.classList.remove(
        "imgOpacity"
      );
      inputRef.current.parentNode.classList.remove("inputOpacity");

      const delImages = deleteImageList.filter((img) => img !== imgContainerId);
      setDeleteImageList(delImages);
    }
  };

  return index === 0 ? (
    <div
      id={_id}
      ref={ref}
      className="row-span-2 col-span-2 border-2 border-slate-300 rounded-lg relative image-container"
      draggable
      onDragStart={() => (dragPhoto.current = index)}
      onDragEnter={() => (draggedOverPhoto.current = index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
    >
      <img src={path} alt="" className="rounded-lg image" />
      <div className="input-container">
        <input
          ref={inputRef}
          type="checkbox"
          name=""
          id="check"
          className="w-5 h-5"
          onClick={checkImage}
        />
      </div>
    </div>
  ) : (
    <div
      id={_id}
      ref={ref}
      className="border-2 border-slate-300 rounded-lg relative image-container"
      draggable
      onDragStart={() => (dragPhoto.current = index)}
      onDragEnter={() => (draggedOverPhoto.current = index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
    >
      <img src={path} alt="" className="rounded-lg image" />
      <div className="input-container">
        <input
          ref={inputRef}
          type="checkbox"
          name=""
          id="check"
          className="w-5 h-5"
          onChange={checkImage}
        />
      </div>
    </div>
  );
};

const forwardedPhoto = React.forwardRef(Photo);

export default forwardedPhoto;
