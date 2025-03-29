import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ImageGallery() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://mern-image-gallery.onrender.com/api/images");
      const { data } = await response.json();
      setImageList(data);
    } catch {
      toast.error("Internal Server Error, Please try again");
    }
  };

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    const formData = new FormData();
    acceptedFiles.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch("https://mern-image-gallery.onrender.com/api/images/upload-images", {
        method: "POST",
        body: formData,
      });
      const { message } = await response.json();
      toast.success(message);
      fetchImages();
    } catch {
      toast.error("Error while uploading images");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-12 px-6">
      <div
        {...getRootProps()}
        className="w-full border-2 border-dashed border-gray-400 bg-gray-50 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-100 transition-all duration-300 flex flex-col items-center justify-center"
      >
        <input {...getInputProps()} />
        <button className="w-14 h-14 bg-blue-500 text-white text-3xl font-bold rounded flex items-center justify-center shadow-md mb-3">
          +
        </button>
        <p className="text-lg font-medium text-gray-700">
          Drag & drop your images here, or <span className="font-semibold text-blue-600 hover:underline">click to upload</span>
        </p>
      </div>

      {loading && <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mt-6"></div>}

      <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {imageList.map(({ _id, imageURL, originalName }) => (
          <div key={_id} className="relative bg-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <Link to={`/${_id}`} className="!no-underline">
              <img src={imageURL} alt={originalName} className="w-full h-64" />
              {/* <div className="absolute inset-0 bg-black-100 bg-opacity-1 hover:bg-opacity-40 flex items-center justify-center text-white font-semibold text-lg opacity-0 hover:opacity-100 transition-all duration-300">
                View Image
              </div> */}
              <p className="p-4 text-center text-gray-900 font-semibold truncate no-underline">{originalName}</p>
            </Link>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default ImageGallery;
