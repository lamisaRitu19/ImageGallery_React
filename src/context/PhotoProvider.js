import React, { createContext, useRef, useState } from "react";

export const PhotoContext = createContext();

const PhotoProvider = ({ children }) => {
  const [deleteImageList, setDeleteImageList] = useState([]);
  const imageContainerRef = useRef([]);
  //   imageContainerRef.current = [];

  const handleDelete = () => {
    console.log("delete");
    console.log(imageContainerRef);
    // myRefs.current = things.map((element, i) => myRefs.current[i] ?? createRef());
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
