import { useState } from "react";
import { Link } from "react-router-dom";

const CharCard = ({ char }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to="/char"
      state={{
        id: char._id,
        name: char.name,
        picturePath: char.thumbnail.path,
        pictureExt: char.thumbnail.extension,
        description: char.description,
      }}
      className="font-roboto"
    >
      <h1 className="my-4 w-[250px] truncate font-oswald text-2xl">
        {char.name}
      </h1>
      <div className="relative">
        <img
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className={isHover ? "opacity-70" : ""}
          src={`${char.thumbnail.path}/portrait_uncanny.${char.thumbnail.extension}`}
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
            Voir détails
          </button>
        )}
      </div>

      <div className="h-[40px] w-[220px] truncate pt-2 text-start text-sm">
        {char.description}
      </div>
    </Link>
  );
};
export default CharCard;
