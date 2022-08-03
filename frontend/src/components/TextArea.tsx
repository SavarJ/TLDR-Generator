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
      placeholder="Enter paragraph you want to summarize here... (max 500 characters otherwise my credit card will be angry at me ;) )"
      onChange={(e) => setTextarea(e.target.value)}
      value={textarea}
      maxLength={500}
    ></textarea>
  );
};

export default TextArea;
