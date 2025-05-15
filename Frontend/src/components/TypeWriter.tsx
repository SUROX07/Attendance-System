import { useState, useEffect } from "react";

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1000,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = texts[index];

    if (!isDeleting) {
      if (currentText.length < currentString.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentString.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setIsDeleting(true), delayBetweenTexts);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentString.slice(0, currentText.length - 1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }
  }, [currentText, isDeleting, index, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <div >
      {currentText}
      <span className="animate-blink">|</span>
    </div>
  );
};

export default Typewriter;
