import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const OneComic = ({ user, setUserNeedsRefresh, userNeedsRefresh }) => {
  const location = useLocation();
  const { id, title, picturePath, pictureExt, description } = location.state;

  const isInFav = useMemo(
    () =>
      user?.favorites.filter(({ comicId }) => {
        return comicId === id;
      }).length > 0,
    [id, user?.favorites]
  );
  const addToFav = async () => {
    const url = `http://localhost:5001/addfav/`;
    try {
      await axios.put(url, {
        userId: user._id,
        id: id,
        title,
        picturePath,
        pictureExt,
        description,
      });
      setUserNeedsRefresh(true);
    } catch (e) {
      console.log(e.response);
    }
  };

  const removeFromFav = async () => {
    try {
      await axios.put(`http://localhost:5001/remove`, {
        userId: user._id,
        id: id,
      });
      setUserNeedsRefresh(true);
    } catch (e) {
      console.log(e.response);
    }
  };

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
            <div className="flex items-end ">
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
