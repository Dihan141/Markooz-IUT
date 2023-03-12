import React from 'react'
import { FiShoppingBag, FiSearch } from "react-icons/fi"
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ADD } from "../../../controller/action"
import Swal from 'sweetalert2'
export const ProductItems = ({data}) => {
    const dispatch = useDispatch()
    const addToCart = (e) => {
        // console.log(e)
        // ADD(e) => single items lai add garko
        dispatch(ADD(e))
    }
    const [openImage, setOpenImage] = useState(false)
    const [img, setImg] = useState("")

    const onOpenImage = (src) =>{
        setImg(src)
        setOpenImage(true)
    }

    const handleOnClickAdd = (items) =>{
        addToCart(items);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item Added',
            showConfirmButton: false,
            timer: 1000
          });
    }
    return (
        <>
            <div className="product_items">
                {data.map((items) => (
                    <div className="box" key={items.id}>
                        <div className="img">
                            <img src={items.cover} alt="Somethings should be here" />
                            <div className="overlay">
                                <button className='button' onClick={() => handleOnClickAdd(items)}>
                                    <FiShoppingBag />
                                </button>
                                <button className='button'>
                                    <AiOutlineHeart />
                                </button>
                                <button className='button' onClick={() => onOpenImage(items.cover)}>
                                    <FiSearch />
                                </button>
                            </div>
                        </div>
                        <div className="details">
                            <h3>{items.title}</h3>
                            <h3>{items.author}</h3>
                            <h3>Price : ${items.price}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className={openImage ? "modelOpen" : "modelClose"}>
                <div className='onClickImage'>
                <img src={img} alt='' />
                <button className='button' onClick={() => setOpenImage(false)}>
                    <AiOutlineClose />
                </button>
                </div>
            </div>

        </>
    )
}
