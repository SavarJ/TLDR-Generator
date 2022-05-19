interface AnswerCardProps {
  answer: string;
}
const AnswerCard: React.FC<AnswerCardProps> = ({ answer }) => {
  return (
    <div className="border-2 p-4 border-white rounded-md shadow-lg hover:shadow-xl shadow-white hover:shadow-white">
      <h2 className="text-center font-bold text-2xl tracking-tight">Answer</h2>
      <p className="text-center font-mono text-xl tracking-tight">{answer}</p>
    </div>
  );
};

export default AnswerCard;
