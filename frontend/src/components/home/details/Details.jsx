import React, { useEffect, useState } from "react"
import { MdStarRate } from "react-icons/md"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action"
import { Header } from "../../common/Header"
import { Footer } from "../../common/Footer"

export const Details = () => {
  const [data, setData] = useState([])
  const { id } = useParams()

  //console.log(id)

  const getdata = useSelector((state) => state.cartReducer.carts)
  //console.log(getdata)

  const compare = () => {
    let compareData = getdata.filter((e) => {
      return e.id == id
    })
    setData(compareData)
  }

  useEffect(() => {
    compare()
  }, [id])

  // delete item
  const history = useHistory()
  const deletes = (id) => {
    dispatch(DELETE(id))
    history.push("/")
  }

  // increment item
  const dispatch = useDispatch()
  const increment = (e) => {
    dispatch(ADD(e))
  }

  // descriment item
  const decrement = (item) => {
    dispatch(REMOVE_INT(item))
  }

  return (
    <>
    <Header />
      <article>
        <section className='details'>
          <h2 className='details_title'>Product Details Pages</h2>
          {data.map((item) => (
            <div className='details_content'>
              <div className='details_content_img'>
                <img src={item.cover} alt='' />
              </div>
              <div className='details_content_detail'>
                <h1>{item.title}</h1>
                <div className='rating'>
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <label htmlFor=''>(1 customer review)</label>
                </div>
                <h3> ${item.price * item.qty}</h3>
                <br />
                <p><b>{item.author}</b></p>
                <div className='qty'>
                  <div className='count'>
                    <button onClick={() => increment(item)}>
                      <AiOutlinePlus />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={item.qty <= 1 ? () => deletes(item.id) : () => decrement(item)}>
                      <AiOutlineMinus />
                    </button>
                  </div>
                  <button className='button'>Add To Cart</button>
                </div>
                <div className='desc'>
                  <h4>PRODUCTS DESCRIPTION</h4>
                  <p>Tailor made in IUT. Our fabric will bring you closer to Red Heaven no matter where you may find yourself equiping this product. May our journey in IUT pave the way to a successful career path.</p>
                  <h4> PRODUCT DETAILS</h4>
                  <ul>
                    <li>
                      <p> <b>Material:</b> Plastic, Wood</p>
                    </li>
                    <li>
                      <p><b>Legs:</b> Lacquered oak and black painted oak</p>
                    </li>
                    <li>
                      <p><b>Dimensions and Weight:</b> Dimensions and Weight: Height: 80 cm, Weight: 5.3 kg</p>
                    </li>
                    <li>
                      <p><b>Length:</b>Length: 48cm</p>
                    </li>
                    <li>
                      <p><b>Depth:</b> 52 cm</p>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      </article>
      <Footer/>
    </>
  )
}
