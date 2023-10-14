import { TiTick } from "react-icons/ti";

import { useContext } from "react";
import { CheckContext } from "../utils/Check";

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
    <div className="absolute -translate-x-1/2 left-1/2 top-36">
      <h1 className="pb-4 text-2xl font-semibold text-yellow-400">
        Enter username:
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          name="username"
          className="py-1 pl-2 border-2 border-gray-400 outline-none bg-neutral-800 focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className="px-2 bg-gray-400  focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          <TiTick className="text-neutral-800" />
        </button>
      </form>
    </div>
  );
}
