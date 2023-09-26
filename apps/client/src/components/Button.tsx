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
      className="w-64 sm:w-80 px-4 py-2 group transition-all bg-blue-900 hover:bg-blue-900/80 rounded-lg cursor-pointer"
    >
      <h1 className="flex justify-center items-center gap-1 transition-all group-hover:text-gray-400 text-lg sm:text-xl text-center">
        {icon}
        {title}
      </h1>
    </Link>
  );
}
