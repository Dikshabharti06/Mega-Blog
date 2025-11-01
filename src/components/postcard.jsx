import React from "react";
import Service from "../appwrite/config1";
import { Link } from "react-router-dom";

function Postcard({ $id, title, FeaturedImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {FeaturedImage ? (
            <img
              src={Service.getFilePreview(FeaturedImage)}
              alt={title || "Post image"}
              className="rounded-xl"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 italic rounded-xl">
              No image available
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
