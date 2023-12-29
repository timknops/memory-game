import { useState, useEffect } from "react";

const RandomImage = ({ score, setScore, highScore, setHighScore }) => {
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const importImages = async () => {
      try {
        // Import all images in the /assets/img folder.
        const imageContext = import.meta.glob("../assets/img/*.jpg");
        const imageKeys = Object.keys(imageContext); // Get all the paths of the images.

        // Import all the images and store them in an array.
        const imageList = await Promise.all(
          imageKeys.map(async (key) => {
            const module = await imageContext[key]();
            return module.default;
          })
        );

        setImages(imageList);

        // Randomly pick an initial image.
        const randomIndex = Math.floor(Math.random() * imageList.length);
        setRandomImage(imageList[randomIndex]);
      } catch (error) {
        console.error("Error importing images:", error);
      }
    };

    importImages();
  }, []);

  const handleRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  };

  return (
    <div className="row-span-3 container mx-auto flex justify-center items-start h-full">
      <div className="h-full w-auto aspect-square rounded-xl p-5 bg-neutral-700 shadow-lg shadow-neutral-900/50">
        <img
          className="object-cover object-center h-full border-4 border-neutral-500 rounded-xl"
          src={randomImage}
          alt="random"
          onClick={handleRandomImage}
        />
      </div>
    </div>
  );
};

export default RandomImage;
