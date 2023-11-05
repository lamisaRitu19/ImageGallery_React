import React, { createContext, useRef, useState } from "react";

export const PhotoContext = createContext();

const PhotoProvider = ({ children }) => {
  const [deleteImageList, setDeleteImageList] = useState([]);
  const imageContainerRef = useRef({});

  const handleDelete = () => {
    deleteImageList.forEach((img) => {
      imageContainerRef.current[img].style.display = "none";
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
