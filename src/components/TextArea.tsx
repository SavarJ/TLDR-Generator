interface TextAreaProps {
  textarea: string;
  setTextarea: React.Dispatch<React.SetStateAction<string>>;
}
const TextArea: React.FC<TextAreaProps> = ({ textarea, setTextarea }) => {
  return (
    <textarea
      className="w-full h-64 p-4 bg-gray-800 text-white font-mono"
      id=""
      rows={25}
      cols={50}
      placeholder="Enter paragraph you want to summarize here..."
      onChange={(e) => setTextarea(e.target.value)}
      value={textarea}
    ></textarea>
  );
};

export default TextArea;
