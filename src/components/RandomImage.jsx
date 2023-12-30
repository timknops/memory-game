import { useState, useEffect } from "react";

const RandomImage = ({
  setImages,
  setBaseImages,
  setBonusImages,
  randomImage,
  setRandomImage,
}) => {
  const [loading, setLoading] = useState(true);

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

        // Separate the images into two arrays, the first one containing all but the last 5 images.
        const baseImageList = imageList.slice(0, imageList.length - 3);
        const bonusImageList = imageList.slice(imageList.length - 3);

        setBaseImages(baseImageList);
        setBonusImages(bonusImageList);
        setImages(baseImageList);
        setLoading(false);

        // Randomly pick an initial image from the base images array.
        const randomIndex = Math.floor(Math.random() * baseImageList.length);
        setRandomImage(baseImageList[randomIndex]);
      } catch (error) {
        console.error("Error importing images:", error);
      }
    };

    importImages();
  }, [setImages, setBaseImages, setRandomImage, setBonusImages]);

  return (
    <div className="flex justify-center items-start h-full aspect-square">
      <div className="h-full w-auto rounded-xl p-5 bg-neutral-700 shadow-lg shadow-neutral-900/50">
        {loading ? (
          <div className="animate-pulse h-full w-full bg-neutral-300 rounded-xl"></div>
        ) : (
          <img
            className="object-cover object-center h-full border-4 border-neutral-500 rounded-xl"
            src={randomImage}
            alt="random"
          />
        )}
      </div>
    </div>
  );
};

export default RandomImage;
