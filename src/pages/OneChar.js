import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SmallComicCard from "../components/SmallComicCard";

const OneChar = () => {
  const [comicsOfThisChar, setComicsOfThisChar] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { id, name, picturePath, pictureExt, description } = location.state;

  useEffect(() => {
    const fetchComicForThisChar = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/comics/${id}`);
        setComicsOfThisChar(res.data.comics);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchComicForThisChar();
    console.log(comicsOfThisChar);
  }, [id]);

  return isLoading ? (
    <div className="h-screen">Loading</div>
  ) : (
    <div className="flex h-screen justify-center">
      <div className="mt-16 flex h-[750px] w-[1060px] justify-evenly bg-[#f2e6e6] text-black">
        <div className="my-auto">
          <h1 className="mb-4 py-3 font-oswald text-4xl font-bold">{name}</h1>
          <img
            className="w-[400px]"
            src={`${picturePath}.${pictureExt}`}
            alt="default"
          />
        </div>
        <div className="mt-20 w-1/3">
          <div className="py-6 font-oswald text-3xl font-bold">
            Petite Description du héro :
          </div>
          <div className="pt-4 font-roboto text-lg">{description}</div>
          <div>
            <h2 className="py-1 font-oswald text-lg">Apparaît sur :</h2>
            <div className="h flex h-[350px] flex-wrap overflow-y-auto">
              {comicsOfThisChar.map((comic) => {
                return <SmallComicCard comic={comic} key={comic._id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneChar;
