const UnderlineText: React.FC<{ text: string; theme?: "light" | "dark" }> = ({ text, theme }) => {
  return <h3 className={`_under_border font-bold ${theme === "light" ? "text-white" : "text-darkGold"}`}>{text}</h3>;
};

export default UnderlineText;
