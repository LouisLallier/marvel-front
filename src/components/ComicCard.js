import { useState } from "react";
import { Link } from "react-router-dom";

const ComicCard = ({ comic }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to="/comic"
      state={{
        id: comic._id,
        title: comic.title,
        picturePath: comic.thumbnail.path,
        pictureExt: comic.thumbnail.extension,
        description: comic.description,
      }}
      className="font-roboto"
    >
      <h1 className="my-4 w-[250px]  font-oswald text-2xl">{comic.title}</h1>
      <div className="relative">
        <img
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className={isHover ? "opacity-70" : ""}
          src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
          alt="default"
        />
        {isHover && (
          <button
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
            className="absolute right-0 left-0 bottom-0 top-0 z-10 my-auto mx-auto h-12 w-28 rounded-xl bg-[#ED161F] opacity-100"
          >
            Voir details
          </button>
        )}
      </div>

      <div className="h-[40px] w-[220px] truncate pt-2 text-start text-sm">
        {comic.description}
      </div>
    </Link>
  );
};
export default ComicCard;
