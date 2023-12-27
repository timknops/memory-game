import Header from "./components/Header";

import { useState } from "react";

const App = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <div className="h-screen w-screen">
      <Header score={score} highScore={highScore} />
    </div>
  );
};

export default App;
