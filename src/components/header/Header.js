import logo from "../../assets/images/logo-marvel.png";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = ({ handleTokenAndId, token }) => {
  return (
    <div className="h-26 flex justify-between border-b-2 border-black bg-[#ED161F]">
      <Link to="/">
        <div className="flex items-center ">
          <img className="h-24" src={logo} alt="" />
          <div className="pt-6 font-oswald text-6xl font-bold">Fans</div>
        </div>
      </Link>

      <Nav handleTokenAndId={handleTokenAndId} token={token} />
    </div>
  );
};
export default Header;
