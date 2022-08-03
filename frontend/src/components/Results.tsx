import AnswerCard from "./AnswerCard";
import { Answer } from "./Answer";

interface ResultsProps {
  array: Answer[];
}
const Results: React.FC<ResultsProps> = ({ array }) => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Results</h1>
      <div className="flex flex-col items-center justify-center space-y-8">
        {array.map((data, idx) => {
          return (
            <AnswerCard key={data._id} data={data} index={array.length - idx} />
          );
        })}
      </div>
    </>
  );
};

export default Results;
