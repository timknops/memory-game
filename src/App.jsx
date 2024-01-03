import { useEffect, useState } from "react";

import Header from "./components/Header";
import RandomImage from "./components/RandomImage";
import GuessButton from "./components/GuessButton";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [images, setImages] = useState([]);
  const [bonusImages, setBonusImages] = useState([]);
  const [guessedImages, setGuessedImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bonusIndex, setBonusIndex] = useState(0);

  /** Gets the high score from localStorage and sets it as the highScore state. */
  useEffect(() => {
    const existingHighScore = JSON.parse(localStorage.getItem("highScore"));

    if (existingHighScore) {
      setHighScore(existingHighScore);
    }
  }, []);

  /** Sets the highScore state to the high score in localStorage. Updated every time the highScore state changes. */
  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

  /** Randomly picks images from the imageList array and sets them as the baseImages and bonusImages states. */
  const randomizeAllImages = () => {
    // Randomly shuffle the images.
    for (let i = imageList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imageList[i], imageList[j]] = [imageList[j], imageList[i]];
    }

    // Separate the images into two arrays, the first one containing the first half of the images, and the second one containing the rest.
    const baseImageList = imageList.slice(0, imageList.length / 2);
    const bonusImageList = imageList.slice(imageList.length / 2);

    setBonusImages(bonusImageList);
    setImages(baseImageList);
  };

  /** Picks a random image from the images array and sets it as the randomImage state. */
  const pickRandomImage = () => {
    let randomIndex = Math.floor(Math.random() * images.length);

    // If the random image is the same as the current one, pick another one.
    while (images[randomIndex] === randomImage) {
      randomIndex = Math.floor(Math.random() * images.length);
    }

    setRandomImage(images[randomIndex]);
  };

  /**
   * If the user guesses correctly, increment the score and add the image to the guessedImages array.
   * If the user guesses incorrectly, reset the score and empty the guessedImages array.
   * @param {string} guess - The user's guess.
   */
  const handleGuess = (guess) => {
    // If the user guesses incorrectly, reset the score and empty the guessedImages array.
    // Incorrectly means that the user guesses no and the image has been guessed before,
    // or the user guesses yes and the image hasn't been guessed before.
    if (
      (guess === "no" && guessedImages.includes(randomImage)) ||
      (guess === "yes" && !guessedImages.includes(randomImage))
    ) {
      setScore(0);
      setGuessedImages([]);
      randomizeAllImages();
      pickRandomImage();
      setBonusIndex(0);

      return;
    }

    handleCorrectGuess();
  };

  /** If the user guesses correctly, increment the score and add the image to the guessedImages array. */
  const handleCorrectGuess = () => {
    setScore((prevScore) => prevScore + 1);

    // If the image hasn't been guessed before, add it to the guessedImages array.
    if (!guessedImages.includes(randomImage)) {
      setGuessedImages([...guessedImages, randomImage]);
    }

    if (score >= highScore) {
      setHighScore(score + 1);
    }

    // Every 4 points, add a bonus image to the images array.
    if (score % 4 === 0 && score !== 0 && bonusIndex < bonusImages.length) {
      setImages([...images, bonusImages[bonusIndex]]);
      setBonusIndex((prevIndex) => prevIndex + 1);
    }

    pickRandomImage();
  };

  return (
    <div className="grid grid-rows-4 h-screen w-screen p-16">
      <Header score={score} highScore={highScore} />
      <div className="row-span-3 container mx-auto flex items-center justify-center gap-32">
        <GuessButton text="no" onClick={() => handleGuess("no")} />
        <RandomImage
          imageList={imageList}
          setImageList={setImageList}
          setImages={setImages}
          setBonusImages={setBonusImages}
          randomImage={randomImage}
          setRandomImage={setRandomImage}
        />
        <GuessButton text="yes" onClick={() => handleGuess("yes")} />
      </div>
    </div>
  );
};

export default App;
