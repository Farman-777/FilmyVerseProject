import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "./firebase/firebase";
import {  addDoc, doc, updateDoc, query, where, getDocs, } from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import {Appstate} from '../App'
import { useNavigate } from "react-router-dom";

const Review = ({ id, prevRating, userRated }) => {
  const useAppstate = useContext(Appstate)
  const navigate = useNavigate()
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [enteredThought, setEnteredThought] = useState("");
  const [data, setData] = useState([]);
  const [temp,setTemp] = useState(0) //to re-render component for upadted review


  const sendReview = async () => {
    setLoading(true);
    try {
      if(useAppstate.login){
      await addDoc(reviewsRef, {
        movieid: id,
        name: useAppstate.userName,
        thought: enteredThought,
        rating: rating,
        timestamp: new Date().getTime(),
      });

      //updating rating
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      }); 
      setRating(0);
      setEnteredThought("");
      setTemp(temp + 1)

      swal({
        title: "Review Sent",
        icon: "success",
        button: false,
        timer: 3000,
      });

    } else{
      navigate("/login");
    }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        button: false,
        timer: 3000, 
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      setData([]);//to prevent review from copy
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setReviewsLoading(false);
    }
    getData();
  }, [temp]);

  return (
    <div className="mt-4  border-t-2 border-gray-700 w-full">
      <ReactStars
        size={30}
        value={rating}
        half={true}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={enteredThought}
        onChange={(e) => setEnteredThought(e.target.value)}
        placeholder="Share Your Thoughts "
        className="w-full p-2 outline-none header"
      />
      <button
        onClick={sendReview}
        className="bg-green-600 w-full p-1 mt-4 flex justify-center"
      > {loading ? <TailSpin height={30} color="white" /> : "Share"}
      </button>
      {reviewsLoading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div key={i} className=" p-2 mt-2 w-full border-b border-gray-600 header">
                <div className="flex items-center">
                  <p className="text-blue-500">{e.name}</p>
                  <p className="ml-3 text-xs">
                  (  {new Date(e.timestamp).toLocaleString()} )
                  </p>
                </div>
                <ReactStars
                  size={15}
                  value={e.rating}
                  half={true}
                  edit={false}                
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;
