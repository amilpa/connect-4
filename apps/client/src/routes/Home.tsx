import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";

import { CheckContext } from "../utils/Check";
import { useContext } from "react";

export default function Home() {
  const username = useContext(CheckContext).username;
  return (
    <div className="absolute top-24 left-1/2 -translate-x-1/2">
      <h1 className="pt-8 pb-4 sm:py-4 text-center text-yellow-300 text-2xl sm:text-3xl font-bold">
        Connect<span className="text-red-500">Four</span>
      </h1>
      <h1 className="border-2 border-gray-500 rounded-lg py-2 text-center sm:text-xl">
        Welcome, {username}
      </h1>
      <div className="flex flex-col items-center mt-4 gap-4">
        <Button
          link="/create"
          icon={<AiOutlinePlus className="inline text-sm" />}
          title="Create game"
        />
        <Button
          link="/join"
          icon={<BsFillDoorClosedFill className="inline text-sm" />}
          title="Join game"
        />
        <Button
          link="/set"
          icon={<BiUser className="inline text-sm" />}
          title="Change username"
        />
      </div>
    </div>
  );
}
