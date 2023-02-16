import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

const App = () => {
  return (
    <div className="bg-[#281714] ">
      <Header />
      <div className="mx-auto h-screen w-[1200px] text-[#F3DDDD]">
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
