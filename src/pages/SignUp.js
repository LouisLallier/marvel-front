import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleTokenAndId }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  if (errorMessage) {
    console.log(errorMessage);
  }
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("picture", picture);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}signup`,
        formData
      );

      const token = res.data.token;
      const user = res.data.user;
      const userId = res.data.user._id;

      if (token) {
        handleTokenAndId(token, userId, user);
        navigate("/");
      }
    } catch (e) {
      console.log("catch");
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
          <div className="flex justify-center pb-3">S'inscrire</div>
          <div className="pt-3">
            <label className="pl-2" htmlFor="email">
              Nom d'utilisateur :
            </label>
            <input
              className="m-2 rounded-md p-1 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Nom d'utilisateur"
            />
          </div>
          <div className="pt-3">
            <label className="pl-2" htmlFor="email">
              Email :
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
              Password :
            </label>
            <input
              className="m-2 rounded-md p-1 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*********"
            />
          </div>
          <div>
            <label
              className="mb-2 block font-roboto text-sm text-white text-white"
              htmlFor="file_input"
            >
              Merci de bien choisir un Avatar :
            </label>
            <input
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-900  focus:outline-none dark:text-gray-400 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
            <p className="mt-1 text-sm text-black" id="file_input_help">
              SVG, PNG, JPG or GIF
            </p>
          </div>

          <button
            className="mt-5 rounded-xl border border-white p-3 hover:border-none hover:bg-[#CC0006] hover:text-white"
            type="submit"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
