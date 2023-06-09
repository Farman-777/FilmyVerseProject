import React,{useEffect,useState} from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db } from "./firebase/firebase";
import { doc,getDoc } from "firebase/firestore";
import { ThreeCircles } from "react-loader-spinner";
import Review from './Review'

const Detail = () => {
    const {id} = useParams();
    const [data,setData] = useState({
        title:"",
        year:"",
        image:"",
        description:"",
        rating:0,
        rated:0
    });

    const [loading,setLoading] = useState(false)

    useEffect(() => {
        async function getData(){
            setLoading(true)
            const _doc = doc(db,"movies",id);
            const _data = await getDoc(_doc);
            setData(_data.data());
            // console.log(data.rating,data.rated)
            setLoading(false)
        }
        getData();
    },[id])
  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start">
      { loading ? <div className="flex justify-center items-center h-96 w-full">
         <ThreeCircles height={140} color="white" /></div> :
      <>
        <img className="md:sticky top-24 h-96 w-2/3" src={data.image} alt="" />
        
        <div className="md:ml-4 ml-0 w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-400">
        {data.title} <span className="text-xl">({data.year})</span> </h1>

        <ReactStars size={20} half={true} edit={false} value={data.rating/data.rated}/>
        <p className="mt-2">{data.description}</p>
       <Review id={id} prevRating={data.rating} userRated={data.rated} />
      </div>
      </>
      }
    </div>
  );
};

export default Detail;
