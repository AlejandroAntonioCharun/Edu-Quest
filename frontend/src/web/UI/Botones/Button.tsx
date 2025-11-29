import { Link } from "react-router-dom";
import clsx from "clsx";


//definimos las propiedades del button
type ButtonProps = {
  text: string;
  to: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

//construimos el componente button
export default function Button({
  text,
  to,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <Link
      to={to}
      className={clsx(
        "inline-flex items-center font-semibold rounded-xl transition",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {text}
    </Link>
  );
}
