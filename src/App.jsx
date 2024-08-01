import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Foreground from "./components/Foreground";
import Author from "./components/Author";
import ThemeToggler from "./components/ThemeToggler";

import Admin from "./components/Admin/Admin";
function App() {
  return (
    <Router>
      <div className="relative w-full h-screen bg-[--bg-color]">
        <Background />
        <ThemeToggler />
        <Routes>
          <Route path="/" element={<Foreground />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Author />
      </div>
    </Router>
  );
}

export default App;