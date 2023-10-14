import { Route, Routes } from "react-router-dom";

import Change from "./routes/Change";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Waiting from "./routes/Waiting";

import Join from "./routes/Join";
import Play from "./routes/Play";
import Check from "./utils/Check";

import { SocketProvider } from "./utils/Socket";

function App() {
  return (
    <Check>
      <Routes>
        <Route path="/set" element={<Change />} />
        <Route element={<SocketProvider />}>
          <Route path="/create" element={<Waiting />} />
          <Route path="/join" element={<Join />} />
          <Route path="/game" element={<Play />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Check>
  );
}

export default App;
