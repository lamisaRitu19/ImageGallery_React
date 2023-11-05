import React, { useContext, useEffect, useRef, useState } from "react";
import Photo from "../components/Photo";
import imgIcon from "../assets/images/iconImage.png";
import { PhotoContext } from "../context/PhotoProvider";

const PhotoGallery = () => {
  const {
    deleteImageList,
    setDeleteImageList,
    imageContainerRef,
    handleDelete,
  } = useContext(PhotoContext);

  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("data/images.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  const handleClearList = () => {
    setDeleteImageList([]);

    Object.values(imageContainerRef.current).forEach((imgNode) => {
      imgNode.childNodes[1].childNodes[0].checked = false;
      imgNode.childNodes[0].classList.remove("imgOpacity");
      imgNode.childNodes[1].classList.remove("inputOpacity");
    });
  };

  const dragPhoto = useRef(0);
  const draggedOverPhoto = useRef(0);
  const handleSort = () => {
    const imagesClone = [...images];
    const temp = imagesClone[dragPhoto.current];
    imagesClone[dragPhoto.current] = imagesClone[draggedOverPhoto.current];
    imagesClone[draggedOverPhoto.current] = temp;
    setImages(imagesClone);
  };

  return (
    <div className="container bg-white border border-slate-300 rounded-xl drop-shadow mx-auto">
      {deleteImageList.length > 0 ? (
        <div className="flex justify-between items-center border-b-2 border-slate-300 drop-shadow-sm px-8 py-6">
          <span className="text-2xl font-bold">
            <input
              type="checkbox"
              defaultChecked
              onChange={handleClearList}
              name=""
              id=""
              className="w-5 h-5 mr-4"
            />
            <span>{deleteImageList.length} File Selected</span>
          </span>
          <button
            onClick={handleDelete}
            className="text-red-700 text-xl font-semibold"
          >
            Delete Files
          </button>
        </div>
      ) : (
        <div className="text-2xl font-bold border-b-2 border-slate-300 drop-shadow-sm px-8 py-6">
          Gallery
        </div>
      )}

      <div className="grid grid-cols-5 gap-7 p-10">
        {images.map((img, i) => (
          <Photo
            key={i}
            _id={img._id}
            path={img.path}
            ref={(node) => {
              imageContainerRef.current[img._id] = node;
            }}
            index={i}
            dragPhoto={dragPhoto}
            draggedOverPhoto={draggedOverPhoto}
            handleSort={handleSort}
          ></Photo>
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
