import { motion } from "framer-motion";

/**
 * Renders a button for guessing in the memory game.
 * @param {string} text - The text to display on the button.
 * @param {function} onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered GuessButton component.
 */
const GuessButton = ({ text, onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.8 }}
      className="bg-emerald-50 text-emerald-400 text-5xl font-bold rounded-xl shadow-neutral-900/50 shadow-lg h-full w-full sm:text-7xl xl:w-auto xl:aspect-square xl:h-2/5 hover:bg-emerald-400 hover:text-emerald-50 hover:scale-110 active:scale-95 transition-all ease-in-out"
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default GuessButton;
