import { useEffect, useState } from "react";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import ReactPaginate from "react-paginate";

const AllComics = () => {
  const [comics, setComics] = useState();
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(0);
  const [comicsPerPage, setComicsPerPage] = useState(20);
  const [count, setCount] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [zeroResult, setZeroResult] = useState(false);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleCosmicPerPage = (event) => {
    console.log(event.target.value);
    setComicsPerPage(event.target.value);
  };

  const handlePageClick = (event) => {
    const num = Math.floor(count / comicsPerPage);
    setNumberOfPages(num);

    const newOffset = (event.selected * comicsPerPage) % num;
    setPage(newOffset);
    // }
  };

  useEffect(() => {
    const fecthComics = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/comics?limit=${comicsPerPage}&skip=${page}&title=${title}`
        );
        setCount(res.data.count);
        setComics(res.data.results);
        setIsLoading(false);
        setZeroResult(false);
        const num = Math.floor(count / comicsPerPage);
        setNumberOfPages(num);

        if (res.data.results.length === 0) {
          setZeroResult(true);
        }
      } catch (e) {
        console.log(e.response);
      }
    };
    fecthComics();
  }, [title, page, comicsPerPage, zeroResult, numberOfPages, count]);

  // console.log(comics);
  return isLoading ? (
    <div>
      <div className="h-screen">Loading</div>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <div className="font-roboto text-xl text-black">
        <div className="flex items-center justify-center gap-6 p-10">
          <input
            placeholder="Rechercher un Comic..."
            className="rounded-xl px-8 py-4"
            type="text"
            value={title}
            onChange={handleTitle}
          />
          <div className="text-white">Comics par pages :</div>
          <select
            className="rounded-xl p-3"
            value={comicsPerPage}
            onChange={handleCosmicPerPage}
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      {zeroResult ? (
        <div className="h-screen py-14 font-roboto text-2xl">
          Désolé nous n'avons pas trouvé de Comic correspondant a votre
          recherche
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="mb-12 font-oswald text-6xl">Tous nos Comics</h1>

          <div className="flex flex-wrap justify-center gap-6">
            {comics.map((comic) => {
              return <ComicCard key={comic._id} comic={comic} />;
            })}
          </div>
          <div className="my-16">
            <ReactPaginate
              className="flex gap-3 p-2 font-roboto text-2xl"
              pageClassName="p-2"
              nextClassName="p-2"
              previousClassName="p-2"
              activeClassName=" bg-[#ED161F] rounded-md"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
              breakLabel="..."
              nextLabel="next >"
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              pageCount={numberOfPages}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllComics;
