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
  const [file, setFile] = useState();
  const dragPhoto = useRef(0);
  const draggedOverPhoto = useRef(0);

  // images details are fetched from json file
  useEffect(() => {
    fetch("data/images.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  // function triggered when all the image files are unchecked together
  const handleClearList = () => {
    setDeleteImageList([]);

    // the checked images are unchecked and getting styles removed one by one
    Object.values(imageContainerRef.current).forEach((imgNode) => {
      imgNode.childNodes[1].childNodes[0].checked = false;
      imgNode.childNodes[0].classList.remove("imgOpacity");
      imgNode.childNodes[1].classList.remove("inputOpacity");
    });
  };

  // function triggered when all the image files are dragged for sorting
  const handleSort = () => {
    const imagesClone = [...images];
    const temp = imagesClone[dragPhoto.current];
    imagesClone[dragPhoto.current] = imagesClone[draggedOverPhoto.current];
    imagesClone[draggedOverPhoto.current] = temp;
    setImages(imagesClone);
  };

  // function triggered when upload file button is clicked
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="container bg-white border border-slate-300 rounded-xl drop-shadow mx-auto">
      {deleteImageList.length > 0 ? (
        <div className="sm:flex justify-between items-center border-b-2 border-slate-300 drop-shadow-sm px-8 py-3 sm:py-6">
          <p className="text-2xl font-bold mb-2 sm-mb-0">
            <input
              type="checkbox"
              defaultChecked
              onChange={handleClearList}
              name=""
              id=""
              className="w-5 h-5 mr-4"
            />
            <span>{deleteImageList.length} File Selected</span>
          </p>
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

      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7 px-10 py-6 md:py-10">
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

        {file && (
          <div className="border-2 border-slate-300 rounded-lg relative image-container mb-3 sm:mb-0">
            <img src={file} alt="img" className="rounded-lg image" />
          </div>
        )}

        <label className="flex flex-col justify-center items-center bg-slate-50 border-2 border-slate-300 border-dashed rounded-lg py-28 lg:py-0 2xl:py-20 add-image">
          <img src={imgIcon} alt="" className="w-8 mb-4" />
          <p className="text-xl md:text-lg xl:text-xl font-medium">
            Add Images
          </p>
          <input type="file" onChange={handleChange} hidden />
        </label>
      </div>
    </div>
  );
};

export default PhotoGallery;
