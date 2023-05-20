import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { json, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import {  BiUpvote,
  BiDownvote} from "react-icons/bi"
  import {
    addToWishlist,
    removeFromWishlist,
  } from "../../redux/actions/wishlist";
const EventCard = ({ active, data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);

  // useEffect(()=>{
  //   window.localStorage.setItem('set_click',JSON.stringify(click))
  // },[click])

  // useEffect(()=>{
  //   const click_data = window.localStorage.getItem('set_click')
  //   if(click_data !== null) setClick(JSON.parse(click_data))
  // },[])

  // useEffect(()=>{
  //   window.localStorage.setItem('set_click1', JSON.stringify(click1))
  // },[click1])

  // useEffect(()=>{
  //   const click1_data = window.localStorage.getItem('set_click1')
  //   if(click1_data !== null) setClick1(JSON.parse(click1_data))
  // },[])
  // useEffect(() => {
  //   if (wishlist && wishlist.find((i) => i._id === data._id)) {
  //     setClick(true);
  //   } else {
  //     setClick(false);
  //   }
  // }, [wishlist]);

  useEffect(()=>{
    getUpvoteStatus();
    getDownvoteStatus();
  })

  const getUpvoteStatus = async() => {
    await axios.get(`${server}/event/status-upvote/${data._id}/${user._id}`).then(
      (response) =>{
        console.log(response)
        if(response.data.success === true){
          setClick(true)
          console.log(click)
        }else{
          setClick(false)
        }
      }
    ).catch((error)=>{console.log(error)})
  }

  const getDownvoteStatus = async() => {
    await axios.get(`${server}/event/status-downvote/${data._id}/${user._id}`).then(
      (response) =>{
        console.log(response)
        if(response.data.success === true){
          setClick1(true)
          console.log(click1)
        }else{
          setClick1(false)
        }
      }
    ).catch((error)=>{console.log(error)})
  }


  const removeUpvote = async(eventId, userId) => {
    setClick(false);
    await axios.post(`${server}/event/remove-upvote/${eventId}/${userId}`, {}).then(
      (response)=>{
        console.log(response)
      }
    ).catch((error)=>{console.log(error)})
   }

   const removeDownvote = async(eventId, userId) => {
    setClick1(false);
    await axios.post(`${server}/event/remove-downvote/${eventId}/${userId}`, {}).then(
      (response)=>{
        console.log(response)
      }
    ).catch((error)=>{console.log(error)})
   }


 const postUpvote = async(eventId, userId) => {
  setClick(true);
  await axios.post(`${server}/event/post-upvote/${eventId}/${userId}`, {}).then(
    (response)=>{
      console.log(response)
    }
  ).catch((error)=>{console.log(error)})
 }

 const postDownvote = async(eventId, userId) => {
  setClick1(true);
  await axios.post(`${server}/event/post-downvote/${eventId}/${userId}`, {}).then(
    (response)=>{
      console.log(response)
    }
  ).catch((error)=>{console.log(error)})
 }

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto mr-4">
        <img src={`${backend_url}${data.images[0]}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}৳
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}৳
            </h5>
          </div>
        {/* <p>Time Remaining :</p> */}
          {/* <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span> */}
        </div>
        <span className="font-[400] text-[17px] text-[#475ad2] italic">
            Time Remaining
          </span>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
        {click ? (
            <BiUpvote
            size={22}
            className="cursor-pointer absolute"
            onClick={() => removeUpvote(data._id, user._id)}
            color="43f773"
            title="Remove Vote"
            />
        ) : (
            <BiUpvote
            size={22}
            className="cursor-pointer absolute"
            onClick={click1? "": () => postUpvote(data._id, user._id) }
            color="#333"
            title="Up Vote"
            />
        )}
    
        {click1 ? (
                <BiDownvote
                size={22}
                className="cursor-pointer absolute mx-12 mt-1"
                onClick={() => removeDownvote(data._id, user._id)}
                color="red"
                title="Remove Vote"
                />
            ) : (
                <BiDownvote
                size={22}
                className="cursor-pointer absolute mx-12 mt-1"
                onClick= {click? "": () => postDownvote(data._id, user._id) } 
                color="#333"
                title="Down Vote"
                />
            )}
          {/* <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div> */}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
