import React, { createContext, useRef, useState } from "react";
import Swal from "sweetalert2";

export const PhotoContext = createContext();

const PhotoProvider = ({ children }) => {
  const [deleteImageList, setDeleteImageList] = useState([]);
  const imageContainerRef = useRef({});

  //   function triggered when delete button is clicked
  const handleDelete = () => {
    deleteImageList.forEach((img) => {
      imageContainerRef.current[img].style.display = "none";
    });
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      text: `Number of image deleted is ${deleteImageList.length}`,
      width: 400,
      showConfirmButton: false,
      timer: 2500,
    });
    setDeleteImageList([]);
  };

  const photoInfo = {
    deleteImageList,
    setDeleteImageList,
    imageContainerRef,
    handleDelete,
  };

  return (
    <PhotoContext.Provider value={photoInfo}>{children}</PhotoContext.Provider>
  );
};

export default PhotoProvider;
