import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const OneComic = ({ user }) => {
  const location = useLocation();
  const { id, title, picturePath, pictureExt, description } = location.state;

  console.log(id);

  console.log(user);
  return (
    <div className="flex h-screen justify-center">
      <div className="mt-16 flex h-[750px] w-[1060px] justify-evenly bg-[#f2e6e6] text-black">
        <div className="my-auto">
          <h1 className="mb-4 py-3 font-oswald text-4xl font-bold">{title}</h1>
          <img
            className="w-[400px]"
            src={`${picturePath}.${pictureExt}`}
            alt="default"
          />
        </div>
        <div className="mt-20 w-1/3">
          <div className="py-6 font-oswald text-3xl font-bold">
            Petite Description du comic :
          </div>
          <div className="pt-4 font-roboto text-lg">{description}</div>
          <button className="mt-20 rounded-md bg-[#ED161F] p-4 font-oswald text-white">
            <FontAwesomeIcon className="pr-2" icon={faHeart} />
            Ajouter a favoris
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneComic;
