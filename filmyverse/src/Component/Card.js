import ReactStars from "react-stars";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { moviesRef } from "./firebase/firebase";
import { getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        // console.log(doc,doc.id) 
        setData((prevState) => [...prevState, { ...(doc.data()), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);



  return (
    <div className="flex flex-wrap justify-between px-3 mt-2 ">
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-screen h-96">
          <ThreeDots height={140} color="White" />
        </div>
      ) : 
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}>
              <div
                key={i}
                className="card font-medium shadow-lg p-2 hover:-translate-y-2 cursor-pointer mt-6 transition-all duration-500"
              >
                <img className="h-30 md:h-72" src={e.image} alt="" />
                <h1>{e.title}</h1>
                <h1 className="flex items-center">
                  <span className="text-gray-500">Rating:</span>
                  <ReactStars
                    size={20}
                    half={true}
                    edit={false}
                    value={e.rating/e.rated}
                  />
                </h1>
                <h1>
                  <span className="text-gray-500">Year:</span> {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
};

export default Card;
