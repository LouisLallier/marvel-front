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
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchComics = async () => {
      const limit = 100;
      const randomIndex = Math.floor(Math.random() * 4200);
      console.log(randomIndex);
      try {
        const res = await axios.get(
          `http://localhost:5001/comics?limit=${limit}&skip=${randomIndex}&title=${title}`
        );

        const randomIndexTab = [];

        for (let i = 0; randomIndexTab.length < 12; i++) {
          const randomNum = Math.floor(Math.random() * 100);
          if (!randomIndexTab.includes(randomNum)) {
            randomIndexTab.push(randomNum);
          }
        }

        console.log(randomIndexTab);
        const newTab = [];
        randomIndexTab.map((index) => {
          newTab.push(res.data.results[index]);
          setCarouselComics(newTab);
          return newTab;
        });
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchComics();
  }, []);

  return isLoading ? (
    <span>Loading</span>
  ) : (
    <div>
      <div className="font-oswald text-4xl">
        <h1>Avez-vous déjà lu ?</h1>
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
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {carouselComics.map((comic, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to="/coucou">
                  <img
                    src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                    alt=""
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
