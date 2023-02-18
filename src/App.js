import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AllComics from "./pages/AllComics";
import AllChars from "./pages/AllChars";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cookies from "js-cookie";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [user, setUser] = useState(Cookies.get("user-id") || null);

  const handleTokenAndId = (token, userId, user) => {
    if (token) {
      setToken(token);
      setUser(user);
      console.log(user);
      Cookies.set("token", token, { expires: 2 });
      Cookies.set("user-id", userId, { expires: 2 });
    } else {
      setToken(null);
      setUser("");
      Cookies.remove("token");
      Cookies.remove("user-id");
    }
  };

  return (
    <div className="bg-[#281714]">
      <Router>
        <Header handleTokenAndId={handleTokenAndId} token={token} />
        <div className="mx-auto h-screen w-[1200px] text-[#F3DDDD]">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/comics" element={<AllComics />} />
            <Route path="/chars" element={<AllChars />} />
            <Route
              path="/signin"
              element={<SignIn handleTokenAndId={handleTokenAndId} />}
            />
            <Route
              path="/signup"
              element={<SignUp handleTokenAndId={handleTokenAndId} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
