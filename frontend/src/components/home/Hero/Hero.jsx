import React, {useState} from 'react'
import { BiSearch, BiServer } from "react-icons/bi"
import { products } from "../../assets/data/data"
import { SearchItems } from "./SearchItems"

export const Hero = () => {
    // search
  const [value, setValue] = useState("")
  const onChanage = (e) => {
    setValue(e.target.value)
  }

  const onSearch = (key) => {
    setValue(key)
    console.log("search", key)
  }
    return (
        <>
            <section className='hero'>
                <div className="container">
                <h1>
                    <label>
                    All <span>IUT</span>ian Merchandizes in <span>One</span> Place
                    </label>

                </h1>
                <p>Find you favorite IUTian goods from many categories and over 100 items!!!</p>
                <div className="search">
                    <span>All Categories</span>
                        <hr />
                        <input type="text" placeholder='Search Products ...'  onChange={onChanage} value={value} />
                        <button onClick={() => onSearch(value)}>
                            <BiSearch className='searchIcon heIcon' />
                        </button>
                </div>
                </div>
                <SearchItems products={products} value={value} onSearch={onSearch} />
                <p>Examples: T-shirts, Hoodies, Caps, Mobile cases…</p>
                
            </section>
        </>
    )
}
