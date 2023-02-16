import logo from "../../assets/images/logo-marvel.png";
import Nav from "./Nav";

const Header = () => {
  return (
    <div className="flex h-24 justify-between bg-[#ED161F] ">
      <div className="flex items-center ">
        <img className="h-24" src={logo} alt="" />
        <div className="pt-6 font-oswald text-6xl font-bold">Fans</div>
      </div>
      <Nav />
    </div>
  );
};
export default Header;
