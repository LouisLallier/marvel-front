import { Link, useNavigate } from "react-router-dom";

const Nav = ({ handleTokenAndId, token }) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-2/3 items-center justify-around font-roboto text-lg font-bold">
      <div className="flex w-1/2 justify-center gap-10">
        <Link to="/comics">
          <button className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white">
            Tous les comics
          </button>
        </Link>
        <Link to="/chars">
          <button className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white">
            Tous les Heroes
          </button>
        </Link>
      </div>
      {!token ? (
        <div className="flex w-1/2 justify-center gap-10">
          <Link to="/signup">
            <button className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white">
              S'inscrire
            </button>
          </Link>
          <Link to="/signin">
            <button className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white">
              Se Connecter
            </button>
          </Link>
        </div>
      ) : (
        <button
          className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white"
          onClick={() => {
            handleTokenAndId(null, null);
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      )}
    </div>
  );
};

export default Nav;
