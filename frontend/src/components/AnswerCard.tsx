import { useState } from "react";

interface AnswerCardProps {
  prompt: string;
  answer: string;
}
const AnswerCard: React.FC<AnswerCardProps> = ({ prompt, answer }) => {
  const [fullyVisisble, setFullyVisisble] = useState(false);
  return (
    <div
      className={`border-2 p-4 max-w-2xl border-white rounded-md shadow-lg hover:shadow-xl shadow-white hover:shadow-white cursor-pointer transition-all duration-500 ease-in-out
      ${!fullyVisisble ? "max-h-80 overflow-y-hidden" : "h-auto"}
      `}
      onClick={() => setFullyVisisble(!fullyVisisble)}
    >
      <h2 className="font-bold text-lg tracking-tight">
        TL;DR -{">"} {answer}
      </h2>
      <br />
      <div
        className={`text-center font-mono text-base tracking-tight max-w-2xl
        ${
          !fullyVisisble
            ? "text-ellipsis whitespace-nowrap overflow-hidden"
            : ""
        }
        `}
      >
        Original: {prompt}
      </div>
    </div>
  );
};

export default AnswerCard;
