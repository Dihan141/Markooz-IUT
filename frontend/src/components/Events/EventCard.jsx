import React, { useEffect, useState } from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
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
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);
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
      <div className="w-full lg:-w[50%] m-auto">
        <img src={`${backend_url}${data.images[0]}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          {/* <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span> */}
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
        {click ? (
            <BiUpvote
            size={22}
            className="cursor-pointer absolute"
            //   onClick={() => removeFromWishlistHandler(data)}
            color={click ? "green" : "#34eb3a"}
            title="Remove Vote"
            />
        ) : (
            <BiUpvote
            size={22}
            className="cursor-pointer absolute"
            //   onClick={() => addToWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Up Vote"
            />
        )}
    
        {click ? (
                <BiDownvote
                size={22}
                className="cursor-pointer absolute mx-12 mt-1"
                //   onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove Vote"
                />
            ) : (
                <BiDownvote
                size={22}
                className="cursor-pointer absolute mx-12 mt-1"
                //   onClick={() => addToWishlistHandler(data)}
                color={click ? "red" : "#333"}
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
