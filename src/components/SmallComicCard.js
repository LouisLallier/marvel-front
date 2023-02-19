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
      className="w-1/3 font-roboto"
    >
      <h1 className="p w-1/3 truncate font-oswald text-sm">{comic.title}</h1>
      <div className="relative">
        <img
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className={isHover ? "opacity-70" : ""}
          src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
          alt="default"
        />
      </div>
    </Link>
  );
};
export default ComicCard;
