interface IButtonProps {
  props: string;
}

const GreenButton: React.FC<IButtonProps> = ({ props }) => {
  return (
    <button className="bg-green500 text-white p-2 rounded-lg hover:bg-white hover:text-green500 transition-all duration-300">
      {props}
    </button>
  );
};

export default GreenButton;
