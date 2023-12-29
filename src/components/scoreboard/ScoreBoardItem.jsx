const ScoreBoardItem = ({ text, score }) => {
  return (
    <div className="flex bg-neutral-600 rounded p-2 justify-center gap-1 font-semibold">
      <span>{text}</span>
      <span className="text-emerald-500 font-bold">{score}</span>
    </div>
  );
};

export default ScoreBoardItem;
