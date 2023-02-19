import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AllComics from "./pages/AllComics";
import AllChars from "./pages/AllChars";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import OneComic from "./pages/OneComic";
import axios from "axios";
import OneChar from "./pages/OneChar";
import ProtectedRoute from "./components/logs/ProtectedRoute";
import UserInfo from "./pages/UserInfo";

//TODO all
// user info, and update if time

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [user, setUser] = useState({});
  const [handleFetch, setHandleFetch] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = Cookies.get("user-id");
        if (id) {
          const res = await axios.get(`http://localhost:5001/info/${id}`);
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchUser();
  }, [user]);

  const handleTokenAndId = (token, userId, user) => {
    if (token) {
      setToken(token);
      setUser(user);

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
        <Header handleTokenAndId={handleTokenAndId} user={user} token={token} />
        <div className="mx-auto h-full w-[1200px] text-[#F3DDDD]">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/comics" element={<AllComics />} />
            <Route
              path="/comic"
              element={
                <OneComic
                  user={user}
                  handleFetch={handleFetch}
                  setHandleFetch={setHandleFetch}
                />
              }
            />
            <Route path="/chars" element={<AllChars />} />
            <Route path="/char" element={<OneChar />} />
            <Route
              path="/signin"
              element={<SignIn handleTokenAndId={handleTokenAndId} />}
            />
            <Route
              path="/signup"
              element={<SignUp handleTokenAndId={handleTokenAndId} />}
            />
            <Route element={<ProtectedRoute token={token} />}>
              <Route path="/user" element={<UserInfo user={user} />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
