import { TiTick } from "react-icons/ti";

import { CheckContext } from "../utils/Check";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";

export default function Input() {
  const setUsername = useContext(CheckContext).setUsername;
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    localStorage.setItem("username", username);
    setUsername(username);
    navigate("/");
  }

  return (
    <div className="absolute left-1/2 top-36 -translate-x-1/2">
      <h1 className="pb-4 text-2xl font-semibold text-yellow-400">
        Enter username:
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          name="username"
          className="border-2 border-gray-400 bg-neutral-800 py-1 pl-2 outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className=" bg-gray-400 px-2 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          <TiTick className="text-neutral-800" />
        </button>
      </form>
    </div>
  );
}
