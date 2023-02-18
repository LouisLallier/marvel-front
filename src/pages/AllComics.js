import { useEffect, useState } from "react";
import axios from "axios";
import ComicCard from "./ComicCard";

const AllComics = () => {
  const [comics, setComics] = useState();
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(0);
  const [comicsPerPage, setComicsPerPage] = useState(20);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthComics = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/comics?limit=${comicsPerPage}&skip=${page}&title=${title}`
        );
        setComics(res.data.results);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    };
    fecthComics();
  }, [title]);

  console.log(comics);
  return isLoading ? (
    <div>
      <span>Loading</span>
    </div>
  ) : (
    <div className="flex flex-wrap justify-center gap-6">
      {comics.map((comic) => {
        return <ComicCard key={comic._id} comic={comic} />;
      })}
    </div>
  );
};

export default AllComics;
