import React from 'react'
import { Footer } from '../common/Footer'
import { Header } from '../common/Header'
import { Banner } from './banner/Banner'
import { Card } from './Hero/Card'
import { Hero } from './Hero/Hero'
import { Product } from './product/Product'

export const Home = () => {
    return (
        <>
        <Header />
            <Hero />
            <Card />
            <Product/>
            <Banner/>
        <Footer/>
        
        </>
    )
}
