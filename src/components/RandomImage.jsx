import { useState, useEffect, useCallback } from "react";
import image1 from "../assets/img/img-1.jpg";
import image2 from "../assets/img/img-2.jpg";
import image3 from "../assets/img/img-3.jpg";

const RandomImage = ({ score, setScore, highScore, setHighScore }) => {
  const [image, setImage] = useState("");
  const [previousIndex, setPreviousIndex] = useState(null);
  const images = [image1, image2, image3];

  const pickRandomImage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * images.length);

    if (randomIndex === previousIndex) {
      pickRandomImage();
    }

    setPreviousIndex(randomIndex);
    setImage(images[randomIndex]);
  }, [images, previousIndex]);

  const handleClick = () => {
    pickRandomImage();

    setScore(score + 1);
  };

  useEffect(() => {
    pickRandomImage();
  }, [pickRandomImage]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore, setHighScore]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center h-1/2 w-1/2">
        <img
          className="w-1/2 h-1/2 rounded-full"
          src={image}
          alt="random"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default RandomImage;
