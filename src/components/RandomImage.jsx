import { useState, useEffect } from "react";

const RandomImage = ({ setImages, randomImage, setRandomImage }) => {
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

        setImages(imageList);
        setLoading(false);

        // Randomly pick an initial image.
        const randomIndex = Math.floor(Math.random() * imageList.length);
        setRandomImage(imageList[randomIndex]);
      } catch (error) {
        console.error("Error importing images:", error);
      }
    };

    importImages();
  }, [setImages, setRandomImage]);

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
