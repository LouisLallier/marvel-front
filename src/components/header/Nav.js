import { Link, useNavigate } from "react-router-dom";

const Nav = ({ handleTokenAndId, token, user }) => {
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
        <div className="flex w-1/2 justify-center gap-10">
          <Link to="/user">
            <button className="rounded-xl border border-[#ED161F] p-3 hover:bg-[#CC0006] hover:text-white">
              Bonjour {user.username}
            </button>
          </Link>
          <button
            className="rounded-xl bg-[#CC0006] p-3 text-white hover:border hover:border-black hover:bg-[#ED161F] hover:text-black"
            onClick={() => {
              handleTokenAndId(null, null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
