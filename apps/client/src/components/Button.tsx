import { Link } from "react-router-dom";

type ButtonProps = {
  title: string;
  icon: React.ReactNode;
  link: string;
};

export default function Button({ title, icon, link }: ButtonProps) {
  return (
    <Link
      to={link}
      className="w-64 px-4 py-2 transition-all bg-blue-900 rounded-lg cursor-pointer sm:w-80 group hover:bg-blue-900/80"
    >
      <h1 className="flex items-center justify-center gap-1 text-lg text-center transition-all group-hover:text-gray-400 sm:text-xl">
        {icon}
        {title}
      </h1>
    </Link>
  );
}
