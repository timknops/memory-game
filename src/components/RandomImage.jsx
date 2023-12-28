import { useState, useEffect, useCallback } from "react";
import image1 from "../assets/img/img-1.jpg";
import image2 from "../assets/img/img-2.jpg";
import image3 from "../assets/img/img-3.jpg";

const RandomImage = ({ score, setScore, highScore, setHighScore }) => {
  return (
    <div className="row-span-3 container mx-auto flex justify-center items-start h-full">
      <div className="h-full w-auto aspect-square rounded-xl p-5 bg-neutral-700 shadow-lg shadow-neutral-900/50">
        <img
          className="object-cover object-center h-full border-4 border-neutral-500 rounded-xl"
          src={image1}
          alt="random"
        />
      </div>
    </div>
  );
};

export default RandomImage;
