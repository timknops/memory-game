import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Renders a random image from a list of imported images.
 *
 * @component
 * @param {string[]} imageList - The list of imported images.
 * @param {function} setImageList - The function to set the imageList state.
 * @param {string[]} images - The list of base images.
 * @param {function} setImages - The function to set the images state.
 * @param {string[]} bonusImages - The list of bonus images.
 * @param {function} setBonusImages - The function to set the bonusImages state.
 * @param {string} randomImage - The random image being displayed.
 * @param {function} setRandomImage - The function to set the randomImage state.
 * @returns {JSX.Element} The RandomImage component.
 */
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

      // Separate the images into two arrays, the first one containing the first 8 images, and the second one containing the rest.
      const baseImageList = imageList.slice(0, imageList.length / 2);
      const bonusImageList = imageList.slice(imageList.length / 2);

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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="flex justify-center items-start h-full aspect-square"
    >
      <div className="h-full w-auto rounded-xl p-0 sm:p-5 bg-neutral-700 shadow-lg shadow-neutral-900/50">
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
    </motion.div>
  );
};

export default RandomImage;
