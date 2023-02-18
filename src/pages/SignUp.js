import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ handleTokenAndUserId }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5001/signup`, {
        email,
        username,
        password,
      });
      console.log(res.data.token);
      const token = res.data.token;
      const user = res.data.user;
      const userId = res.data.user._id;
      if (token) {
        handleTokenAndUserId(token, userId, user);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      if (e.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      //   Si je reçois un message d'erreur "Missing parameters"
      if (e.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp.");
      }
    }
  };

  return (
    <div className="flex h-screen content-center items-center justify-center pb-40 font-roboto ">
      <div className="w-full max-w-xs">
        <form
          className="mb-4 rounded bg-[#ED161F] px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center pb-3">Sign Up</div>
          <div className="pt-3">
            <label className="pl-2" htmlFor="email">
              Username
            </label>
            <input
              className="m-2 rounded-md p-1 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Your Username"
            />
          </div>
          <div className="pt-3">
            <label className="pl-2" htmlFor="email">
              Email
            </label>
            <input
              className="m-2 rounded-md p-1 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="pt-4">
            <label className="pl-2" htmlFor="pass">
              Password
            </label>
            <input
              className="m-2 rounded-md p-1 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*********"
            />
          </div>

          <button
            className="mt-5 rounded-xl border border-white p-3 hover:border-none hover:bg-[#CC0006] hover:text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
