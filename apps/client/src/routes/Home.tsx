import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";

import { CheckContext } from "../utils/Check";
import { useContext } from "react";

export default function Home() {
  const username = useContext(CheckContext).username;
  return (
    <div className="absolute left-1/2 top-24 -translate-x-1/2">
      <h1 className="pb-4 pt-8 text-center text-2xl font-bold text-yellow-300 sm:py-4 sm:text-3xl">
        Connect<span className="text-red-500">Four</span>
      </h1>
      <h1 className="rounded-lg border-2 border-gray-500 py-2 text-center sm:text-xl">
        Welcome, {username}
      </h1>
      <div className="mt-4 flex flex-col items-center gap-4">
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
