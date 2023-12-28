import ScoreBoardItem from "./ScoreBoardItem";

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="py-8 flex justify-center">
      <div className="w-1/2 grid grid-cols-2 gap-4 bg-neutral-700 p-4 rounded shadow-xl shadow-neutral-900/50">
        <ScoreBoardItem text="Current Score:" score={score} />
        <ScoreBoardItem text="High Score:" score={highScore} />
      </div>
    </div>
  );
};

export default ScoreBoard;
