import AnswerCard from "./AnswerCard";
import { Answer } from "./Answer";

interface ResultsProps {
  array: Answer[];
}
const Results: React.FC<ResultsProps> = ({ array }) => {
  console.log({ array });
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Results</h1>
      <div className="flex flex-col items-center justify-center space-y-8">
        {array.map((data) => {
          return (
            <AnswerCard
              key={data._id}
              prompt={data.prompt}
              answer={data.answer}
            />
          );
        })}
      </div>
    </>
  );
};

export default Results;
