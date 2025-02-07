import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { MovieContent } from "./Components/MovieContent";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-[#0C121A] text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
