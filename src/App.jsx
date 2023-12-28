import Header from "./components/Header";

import { useState } from "react";
import RandomImage from "./components/RandomImage";

const App = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <div className="grid grid-rows-4 h-screen w-screen p-16">
      <Header score={score} highScore={highScore} />
      <RandomImage
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </div>
  );
};

export default App;
