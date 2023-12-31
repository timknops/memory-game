import { useState, useEffect } from "react";

const RandomImage = ({
  imageList,
  setImageList,
  setImages,
  setBonusImages,
  randomImage,
  setRandomImage,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /** Imports all the images in the /assets/img folder and stores them in the imageList state. */
    const importImages = async () => {
      try {
        // Import all images in the /assets/img folder.
        const imageContext = import.meta.glob("../assets/img/*.jpg");
        const imageKeys = Object.keys(imageContext); // Get all the paths of the images.

        // Import all the images and store them in an array.
        const importedImages = await Promise.all(
          imageKeys.map(async (key) => {
            const module = await imageContext[key]();
            return module.default;
          })
        );

        // Set the imageList state to the imported images array.
        setImageList(importedImages);
      } catch (error) {
        console.error("Error importing images:", error);
      }
    };

    importImages();
  }, [setImageList]);

  useEffect(() => {
    /** Randomly picks images from the imageList array and sets them as the baseImages and bonusImages states. */
    const randomlyPickImages = () => {
      // Randomly shuffle the images.
      for (let i = imageList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageList[i], imageList[j]] = [imageList[j], imageList[i]];
      }

      // Separate the images into two arrays, the first one containing all but the last 5 images.
      const baseImageList = imageList.slice(0, imageList.length - 3);
      const bonusImageList = imageList.slice(imageList.length - 3);

      setBonusImages(bonusImageList);
      setImages(baseImageList);

      // Randomly pick an initial image from the base images array.
      const randomIndex = Math.floor(Math.random() * baseImageList.length);
      setRandomImage(baseImageList[randomIndex]);

      setLoading(false);
    };

    if (imageList.length > 0) {
      randomlyPickImages();
    }
  }, [imageList, setBonusImages, setImages, setRandomImage]);

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
