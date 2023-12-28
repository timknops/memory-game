import Header from "./components/Header";

import { useState } from "react";
import RandomImage from "./components/RandomImage";

const App = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <div className="h-screen w-screen">
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
