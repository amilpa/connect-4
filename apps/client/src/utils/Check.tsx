import { createContext, useEffect, useState } from "react";
import Input from "../components/Input";

type user = {
  username: string;
  setUsername: (username: string) => void;
};

export const CheckContext = createContext<user>({
  username: "",
  setUsername: () => {},
});

export default function Check({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  }, []);

  return (
    <CheckContext.Provider value={{ username, setUsername }}>
      {username !== "" ? children : <Input />}
    </CheckContext.Provider>
  );
}
