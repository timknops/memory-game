import ScoreBoard from "./scoreboard/ScoreBoard";

/**
 * Renders the header component with a title and a scoreboard.
 * @param {object} props - The props object.
 * @param {number} props.score - The current score.
 * @param {number} props.highScore - The high score.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = ({ score, highScore }) => {
  return (
    <header className="container mx-auto text-center">
      <h1 className="text-4xl font-bold">Have you seen this image before?</h1>

      <ScoreBoard score={score} highScore={highScore} />
    </header>
  );
};

export default Header;
