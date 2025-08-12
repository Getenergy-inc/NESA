import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import classNames from "classnames";
import { LuLoader } from "react-icons/lu";
import { inter } from "@/lib/utils/font";

type Props = {
  text: string;
  size?: "small" | "medium" | "large" | "extra-small";
  variant?: "filled" | "outline" | "black" | "destructive" | "success";
  className?: string;
  rounded?: "full" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  icon?: JSX.Element;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: FC<Props> = (props) => {
  const {
    onClick,
    icon,
    className: extraClass = "",
    variant = "outline",
    text,
    size = "small",
    disabled = false,
    loading = false,
    iconPosition = "right",
    rounded = "full",
    fullWidth = false,
    ...rest
  } = props;
  let mainClass = `rounded-${rounded ?? "full"} font-semibold duration-300 ${
    fullWidth ? "w-full flex items-center justify-center gap-3" : "w-auto flex items-center gap-2"
  } disabled:opacity-40 disabled:cursor-not-allowed ${inter.className} `;

  switch (variant) {
    case "filled":
      mainClass += "bg-gradient-to-r from-[#febf44] to-[#ed9d19] text-[#191307] ";
      break;
    case "outline":
      mainClass += "bg-transparent border border-[#f4ac2b] text-primaryGold disabled:border-zinc-500/50 ";
      break;
    case "destructive":
      mainClass +=
        "bg-transparent border border-red-500/50 hover:border-red-500 hover:bg-red-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-red-500 text-red-500 disabled:border-red-500/50 ";
      break;
    case "success":
      mainClass +=
        "bg-transparent border border-green-500/50 hover:border-green-500 hover:bg-green-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-green-500 text-green-500 disabled:border-green-500/50 ";
      break;
    case "black":
      mainClass += "hover:bg-primary-800/80 bg-primary-800 text-primaryGold ";
      break;
    default:
      break;
  }

  switch (size) {
    case "extra-small":
      mainClass += "px-4 py-[6px] text-xs ";
      break;
    case "small":
      mainClass += "px-6 py-[10px] text-sm ";
      break;
    case "medium":
      mainClass += "px-6 py-3 ";
      break;
    case "large":
      mainClass += "px-8 py-[14px] ";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${classNames([mainClass, extraClass])} `}
      disabled={disabled || loading}
      {...rest}
    >
      {iconPosition === "left" && (
        <>
          {loading ? (
            <div className="flex-shrink-0">
              <LuLoader size={12} className="animate-spin" />
            </div>
          ) : (
            icon
          )}
        </>
      )}

      <span className="flex-shrink-0">{!loading ? text : "Loading..."}</span>

      {iconPosition === "right" && (
  <>
    {loading ? (
      <div className="flex-shrink-0">
        <LuLoader size={12} className="animate-spin" /> {/* fixed here */}
      </div>
    ) : (
      icon
    )}
  </>
)}
    </button>
  );
};

export default Button;
