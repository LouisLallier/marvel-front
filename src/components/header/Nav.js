const Nav = () => {
  return (
    <div className="flex w-2/3 items-center justify-around font-roboto text-lg font-bold">
      <div className="flex w-1/2 justify-center gap-10">
        <button className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white">
          Tous les comics
        </button>
        <button className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white">
          Tous les Heroes
        </button>
      </div>

      <div className="flex w-1/2 justify-center gap-10">
        <button className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white">
          S'inscrire
        </button>
        <button className="rounded-xl p-3 hover:bg-[#CC0006] hover:text-white">
          Se Connecter
        </button>
      </div>
    </div>
  );
};

export default Nav;
