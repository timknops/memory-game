import { useState } from "react";

import Header from "./components/Header";
import RandomImage from "./components/RandomImage";
import GuessButton from "./components/GuessButton";

const App = () => {
  const [images, setImages] = useState([]);
  const [guessedImages, setGuessedImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  /** Pick a random image from the images array. */
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
    // Incorrectly means that the user guesses no and the image has been guessed before
    // or the user guesses yes and the image hasn't been guessed before.
    if (
      (guess === "no" && guessedImages.includes(randomImage)) ||
      (guess === "yes" && !guessedImages.includes(randomImage))
    ) {
      setScore(0);
      setGuessedImages([]);
      pickRandomImage();

      return;
    }

    // If the user guesses correctly, increment the score and add the image to the guessedImages array if it hasn't been guessed before.
    setScore((prevScore) => prevScore + 1);
    if (!guessedImages.includes(randomImage)) {
      setGuessedImages([...guessedImages, randomImage]);
    }

    // If the score is higher than the high score, update the high score.
    if (score >= highScore) {
      setHighScore(score + 1);
    }

    pickRandomImage();
  };

  return (
    <div className="grid grid-rows-4 h-screen w-screen p-16">
      <Header score={score} highScore={highScore} />
      <div className="row-span-3 container mx-auto flex items-center justify-center gap-32">
        <GuessButton text="no" onClick={() => handleGuess("no")} />
        <RandomImage
          setImages={setImages}
          randomImage={randomImage}
          setRandomImage={setRandomImage}
        />
        <GuessButton text="yes" onClick={() => handleGuess("yes")} />
      </div>
    </div>
  );
};

export default App;
