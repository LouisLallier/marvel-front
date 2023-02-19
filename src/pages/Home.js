import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Link } from "react-router-dom";

const Home = () => {
  const [carouselComics, setCarouselComics] = useState([]);
  const [carouselChars, setCarouselChars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      const limit = 100;
      const randomIndex = Math.floor(Math.random() * 4200);

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}comics?limit=${limit}&skip=${randomIndex}`
        );

        const randomIndexTab = [];

        for (let i = 0; randomIndexTab.length < 12; i++) {
          const randomNum = Math.floor(Math.random() * 100);
          if (!randomIndexTab.includes(randomNum)) {
            randomIndexTab.push(randomNum);
          }
        }
        const newTab = [];
        randomIndexTab.map((index) => {
          newTab.push(res.data.results[index]);
          setCarouselComics(newTab);
          return newTab;
        });
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchComics();

    const fetchChars = async () => {
      const limit = 100;
      const randomIndex = Math.floor(Math.random() * 1200);

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}chars?limit=${limit}&skip=${randomIndex}`
        );

        const randomIndexTab = [];

        for (let i = 0; randomIndexTab.length < 12; i++) {
          const randomNum = Math.floor(Math.random() * 100);
          if (!randomIndexTab.includes(randomNum)) {
            randomIndexTab.push(randomNum);
          }
        }
        const newTab = [];
        randomIndexTab.map((index) => {
          newTab.push(res.data.results[index]);
          setCarouselChars(newTab);
          return newTab;
        });
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchChars();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="min-h-screen">Loading</div>
  ) : (
    <div className=" pb-10">
      <h1 className="py-5 pt-8 text-center font-oswald text-6xl">
        Bienvenue sur MarvelFans.
      </h1>
      <h3 className="py-3 text-center font-roboto text-xl">
        Plongez-vous dans l'univers Marvel !
      </h3>
      <div className="my-10 pb-10 font-oswald text-4xl">
        <h1 className="py-5">Avez-vous déjà lu ?</h1>
        <Swiper
          className=""
          // install Swiper modules
          autoplay={true}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {carouselComics.map((comic, index) => {
            return (
              <SwiperSlide key={index}>
                {/*PATH TO UPDATE*/}
                <Link
                  to="/comic"
                  state={{
                    id: comic._id,
                    title: comic.title,
                    picturePath: comic.thumbnail.path,
                    pictureExt: comic.thumbnail.extension,
                    description: comic.description,
                  }}
                >
                  <img
                    src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                    alt="default"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="my-10 font-oswald text-4xl">
        <h1 className="py-5 text-end">Découvrez de nouveaux héros !</h1>
        <Swiper
          className=""
          // install Swiper modules
          autoplay={true}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {carouselChars.map((char, index) => {
            return (
              <SwiperSlide key={index}>
                <Link
                  to="/char"
                  state={{
                    id: char._id,
                    name: char.name,
                    picturePath: char.thumbnail.path,
                    pictureExt: char.thumbnail.extension,
                    description: char.description,
                  }}
                >
                  <img
                    src={`${char.thumbnail.path}/portrait_uncanny.${char.thumbnail.extension}`}
                    alt="default"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
