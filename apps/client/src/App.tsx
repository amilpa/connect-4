import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Change from "./routes/Change";
import Waiting from "./routes/Waiting";

import Check from "./utils/Check";
import Join from "./routes/Join";
import Play from "./routes/Play";

function App() {
  return (
    <Check>
      <Routes>
        <Route path="/set" element={<Change />} />
        <Route path="/create" element={<Waiting />} />
        <Route path="/join" element={<Join />} />
        <Route path="/game" element={<Play gameCode="" />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Check>
  );
}

export default App;
