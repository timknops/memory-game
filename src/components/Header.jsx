import ScoreBoard from "./scoreboard/ScoreBoard";
import { motion } from "framer-motion";

/**
 * Renders the header component with a title and a scoreboard.
 * @param {object} props - The props object.
 * @param {number} props.score - The current score.
 * @param {number} props.highScore - The high score.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = ({ score, highScore }) => {
  return (
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="container mx-auto text-center 2xl:h-1/5"
    >
      <h1 className="text-2xl sm:text-4xl font-bold">
        Have you seen this image before?
      </h1>

      <ScoreBoard score={score} highScore={highScore} />
    </motion.header>
  );
};

export default Header;
