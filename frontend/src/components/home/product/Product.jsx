import React, { useState } from 'react'
import { products } from '../../assets/data/data'
import { Heading } from '../../common/Heading'
import { ProductItems } from './ProductItems'

export const Product = () => {
    const [data, setdata] = useState(products)
    return (
        <>
            <section className="product">
                <div className="container">
                    <Heading title='Trending Merchandizes' desc='Check out the hottest products being sold over the campus'></Heading>
                    <ProductItems data={data}/>
                </div>
            </section>
        </>
    )
}
