import { useState } from "react";

const ComicCard = ({ comic }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="font-roboto">
      <h1 className="font-oswald">{comic.title}</h1>
      <div className="relative">
        {isHover && <div className="absolute top-0 left-0">coucou</div>}
        <img
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className={isHover ? "bg-yellow-400 opacity-70" : ""}
          src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
          alt="default"
        />
      </div>

      <div className="h-[40px] w-[220px] truncate pt-2 text-start text-sm">
        {comic.description}
      </div>
    </div>
  );
};
export default ComicCard;
