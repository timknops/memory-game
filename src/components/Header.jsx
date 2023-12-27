import ScoreBoard from "./scoreboard/ScoreBoard";

const Header = ({ score, highScore }) => {
  return (
    <header className="container mx-auto text-center py-16">
      <h1 className="text-4xl font-bold">Have you seen this image before?</h1>

      <ScoreBoard score={score} highScore={highScore} />
    </header>
  );
};

export default Header;
