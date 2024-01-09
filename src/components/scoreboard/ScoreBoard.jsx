/**
 * Renders the scoreboard component.
 *
 * @component
 * @param {number} score - The current score.
 * @param {number} highScore - The high score.
 * @returns {JSX.Element} The rendered scoreboard component.
 */
import ScoreBoardItem from "./ScoreBoardItem";

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="pt-6 flex justify-center">
      <div className="w-full grid gap-4 bg-neutral-700 p-4 rounded shadow-xl shadow-neutral-900/50 sm:grid-cols-2 xl:w-1/2">
        <ScoreBoardItem text="Current Score:" score={score} />
        <ScoreBoardItem text="High Score:" score={highScore} />
      </div>
    </div>
  );
};

export default ScoreBoard;
