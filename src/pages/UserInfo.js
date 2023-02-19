import axios from "axios";
import { Link } from "react-router-dom";

const UserInfo = ({ user }) => {
  console.log(user);
  return (
    <div className="mt-16 flex h-screen justify-center">
      <div className="flex h-[750px] w-[1060px] bg-[#f2e6e6] p-14 text-black">
        <div className="w-1/2">
          <h1 className="font-oswald text-5xl">Données du Profil :</h1>
          <div className="flex gap-6 px-5 py-10">
            <div className="font-roboto text-2xl">Avatar :</div>
            <img
              className="h-[100px] w-[100px] rounded-full object-cover"
              src={user.pictureUrl}
              alt="Photo de profil"
            />
          </div>
          <div className="flex flex-col gap-4 py-6 font-roboto">
            <div className="text-2xl">Nom d'utilisateur : </div>
            <div className="text-2xl">{user.username}</div>
          </div>
        </div>
        <div>
          {user.favorites.map((fav) => {
            return (
              <div className="">
                <Link
                  to="/comic"
                  state={{
                    id: fav.comicId,
                    title: fav.title,
                    picturePath: fav.picturePath,
                    pictureExt: fav.pictureExt,
                    description: fav.description,
                  }}
                >
                  <h2 className="w-2/3 truncate py-3 font-oswald">
                    {fav.title}
                  </h2>
                  <img
                    src={`${fav.picturePath}/portrait_xlarge.${fav.pictureExt}`}
                    alt=""
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
