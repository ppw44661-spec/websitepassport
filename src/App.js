// import TrackPassport from "./pages/TrackPassport";
// import "./App.css";

// function App() {
//   return <TrackPassport />;
// }

// export default App;

import { useState } from "react";
import Home from "./pages/home";
import TrackPassport from "./pages/TrackPassport";
import "./App.css";

function App() {
  // "home" = BCG-style landing page, "track" = Track Passport page
  const [page, setPage] = useState("home");

  if (page === "track") {
    return <TrackPassport onBack={() => setPage("home")} />;
  }

  return <Home onTrackClick={() => setPage("track")} />;
}

export default App;