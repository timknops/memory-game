/**
 * Renders a button for guessing in the memory game.
 * @param {string} text - The text to display on the button.
 * @param {function} onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered GuessButton component.
 */
const GuessButton = ({ text, onClick }) => {
  return (
    <button
      className="bg-emerald-50 text-emerald-400 aspect-square h-2/5 text-7xl font-bold rounded-xl shadow-neutral-900/50 shadow-lg hover:scale-110 hover:bg-emerald-400 hover:text-emerald-50 transition-all"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GuessButton;
