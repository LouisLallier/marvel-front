import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CharCard from "../components/CharCard";

const AllChars = () => {
  const [chars, setChars] = useState({});
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [charsPerPage, setCharsPerPage] = useState(20);
  const [count, setCount] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [zeroResult, setZeroResult] = useState(false);

  const handleName = (event) => {
    console.log("coucou");
    setName(event.target.value);
  };
  const handleCharsPerPage = (event) => {
    console.log(event.target.value);
    setCharsPerPage(event.target.value);
  };

  const handlePageClick = (event) => {
    const num = Math.floor(count / charsPerPage);
    setNumberOfPages(num);

    const newOffset = (event.selected * charsPerPage) % num;
    setPage(newOffset);
    // }
  };

  useEffect(() => {
    const fecthComics = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/chars?limit=${charsPerPage}&skip=${page}&name=${name}`
        );
        setCount(res.data.count);
        setChars(res.data.results);
        setIsLoading(false);
        setZeroResult(false);
        const num = Math.floor(count / charsPerPage);
        setNumberOfPages(num);

        if (res.data.results.length === 0) {
          setZeroResult(true);
        }
      } catch (e) {
        console.log(e.response);
      }
    };
    fecthComics();
  }, [name, page, charsPerPage, zeroResult, numberOfPages, count]);

  // console.log(chars);
  return isLoading ? (
    <div>
      <div className="h-screen">Loading</div>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <div className="font-roboto text-xl text-black">
        <div className="flex items-center justify-center gap-6 p-10">
          <input
            placeholder="Rechercher un Héro..."
            className="rounded-xl px-8 py-4"
            type="text"
            value={name}
            onChange={handleName}
          />
          <div className="text-white">Héros par pages :</div>
          <select
            className="rounded-xl p-3"
            value={charsPerPage}
            onChange={handleCharsPerPage}
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
          <h1 className="mb-12 font-oswald text-6xl">Tous les Héros</h1>

          <div className="flex flex-wrap justify-center gap-6">
            {chars.map((char) => {
              return <CharCard key={char._id} char={char} />;
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

export default AllChars;
