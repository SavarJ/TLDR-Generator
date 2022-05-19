interface ButtonProps {
  text: string;
  handleClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, handleClick }) => {
  return (
    <button
      type="submit"
      // make the button a cool dark gradient with a nice hover and button should be small
      className="w-full h-12 bg-gradient-to-b from-orange-600 to-yellow-600 hover:bg-gradient-to-b-dark text-white font-bold py-2 px-4 rounded-full"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
