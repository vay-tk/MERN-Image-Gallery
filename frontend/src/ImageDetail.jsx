import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageDetails, setImageDetails] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const response = await fetch(`https://mern-image-gallery.onrender.com/api/images`);
        const { data } = await response.json();
        setImageList(data);
      } catch (err) {
        toast.error("Internal Server Error, Please try again");
      }
    };

    const fetchImageDetails = async () => {
      try {
        const response = await fetch(`https://mern-image-gallery.onrender.com/api/images/${id}`);
        const { data } = await response.json();
        setImageDetails(data);
      } catch (err) {
        toast.error("Failed to load image details");
      }
    };

    fetchAllImages();
    fetchImageDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const response = await fetch(`https://mern-image-gallery.onrender.com/api/images/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Image deleted successfully!");
        navigate("/");
      } else {
        alert("Failed to delete image.");
      }
    } catch (err) {
      alert("Error deleting image, please try again.");
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    document.body.style.overflow = isFullscreen ? "auto" : "hidden";
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentIndex = imageList.findIndex((image) => image._id === id);
  const prevImageId = currentIndex > 0 ? imageList[currentIndex - 1]._id : null;
  const nextImageId =
    currentIndex < imageList.length - 1
      ? imageList[currentIndex + 1]._id
      : null;

  return (
    <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <Link
        to="/"
        className="mb-4 px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg text-blue-600 font-medium !no-underline hover:text-blue-800 transition-all"
      >
        🔙 Back To Gallery
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
        {imageDetails?.originalName}
      </h1>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-4xl relative">
        <img
          src={imageDetails?.imageURL}
          alt={imageDetails?.originalName}
          className={`w-full h-auto max-h-80 rounded-lg shadow-md object-cover cursor-pointer transition-all ${
            isFullscreen
              ? "fixed inset-0 w-full h-full object-contain bg-black z-50"
              : ""
          }`}
          onClick={toggleFullscreen}
        />
        {isFullscreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={toggleFullscreen}
          >
            <img
              src={imageDetails?.imageURL}
              alt={imageDetails?.originalName}
              className="w-auto h-auto max-w-full max-h-full"
            />
          </div>
        )}
        {prevImageId && (
          <button
            onClick={() => navigate(`/${prevImageId}`)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-800 transition"
          >
            Prev
          </button>
        )}
        {nextImageId && (
          <button
            onClick={() => navigate(`/${nextImageId}`)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-800 transition"
          >
            Next
          </button>
        )}
      </div>
      <div className="mt-4 text-gray-700 text-sm md:text-lg text-center">
        <p>
          <strong className="text-gray-900">Image Type:</strong>{" "}
          {imageDetails?.mimeType}
        </p>
        <p>
          <strong className="text-gray-900">Image Size:</strong>{" "}
          {imageDetails?.size
            ? (imageDetails.size / 1024).toFixed(2) + " KB"
            : "N/A"}
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <button
        onClick={handleDelete}
        className="mt-6 px-6 py-2 bg-red-600 text-white font-medium rounded-lg shadow-lg hover:bg-red-800 transition focus:outline-none"
      >
        Delete Image
      </button>
    </div>
  );
}

export default ImageDetail;
