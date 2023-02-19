import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ handleTokenAndId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}signin`, {
        email,
        password,
      });

      const user = res.data.user;
      const userId = res.data.user._id;
      const token = res.data.token;

      if (token) {
        handleTokenAndId(token, userId, user);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen content-center items-center justify-center pb-40 font-roboto ">
      <div className="w-full max-w-xs">
        <form
          className="mb-4 rounded bg-[#ED161F] px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center pb-3">Sign In</div>
          <div className="pt-3">
            <label className="pl-2" htmlFor="email">
              Email
            </label>
            <input
              className="m-2 rounded-md p-1 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
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
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
