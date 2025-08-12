type Props = {
  text: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const GradientBtn: React.FC<Props> = ({ text, className }) => {
  return (
    <button
      className={`text-[#17120a] xl:px-4 xl:py-3 px-3 py-2 xl:text-base text-sm rounded-lg ${className ?? ""}`}
      style={{ background: `linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)` }}
    >
      {text}
    </button>
  );
};

export default GradientBtn;
