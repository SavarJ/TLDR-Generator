interface ButtonProps {
  text: string;
  handleClick: () => void;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, handleClick, disabled }) => {
  return (
    <button
      type="submit"
      // make the button a cool dark gradient with a nice hover and button should be small
      className={`w-full h-12 bg-gradient-to-b from-orange-600 to-yellow-600 hover:bg-gradient-to-b-dark text-white font-bold py-2 px-4 rounded-full ${
        disabled && "cursor-not-allowed"
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
