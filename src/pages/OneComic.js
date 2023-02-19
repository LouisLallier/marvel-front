import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const OneComic = ({ user }) => {
  const [isInFav, setIsInFav] = useState(false);

  const location = useLocation();
  const { id, title, picturePath, pictureExt, description } = location.state;

  //TODO repair le fetch de user with cookie

  useEffect(() => {
    const checkIsInFav = async () => {
      if (user) {
        try {
          if (user.favorites.includes(id)) {
            setIsInFav(true);
            console.log(isInFav);
            return;
          } else {
            console.log("je suis la ");
            setIsInFav(false);
          }
          setIsInFav(false);
        } catch (e) {
          console.log(e.response);
        }
      }
    };
    checkIsInFav();
  }, [id, isInFav, user]);

  const addToFav = async () => {
    try {
      await axios.put(`http://localhost:5001/addfav/${user._id}/${id}`);
      setIsInFav(true);
    } catch (e) {
      console.log(e.response);
    }
  };

  const removeFromFav = async () => {
    try {
      await axios.put(`http://localhost:5001/remove/${user._id}/${id}`);
      setIsInFav(false);
    } catch (e) {
      console.log(e.response);
    }
  };

  console.log(isInFav);

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

          {isInFav ? (
            <div className="flex items-end justify-center">
              <button className="mt-20 rounded-md bg-green-600 p-4 font-oswald text-white">
                <FontAwesomeIcon className="pr-2" icon={faHeart} />
                Ajouté a favoris
              </button>
              <button
                onClick={removeFromFav}
                className="ml-4 rounded-md bg-[#ED161F] p-4 text-white"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          ) : (
            <button
              onClick={addToFav}
              className="mt-20 rounded-md bg-[#ED161F] p-4 font-oswald text-white"
            >
              <FontAwesomeIcon className="pr-2" icon={faHeart} />
              Ajouter a favoris
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneComic;
