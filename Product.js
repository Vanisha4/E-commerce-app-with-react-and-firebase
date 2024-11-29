import React from 'react'
import { individualProducts } from './individualProducts';
export const Products = ({Products, addToCart}) => {
    console.log(Products);
    return Products.map((individualProducts)=>(
        <individualProducts key ={individualProducts.ID} individualProducts={individualProducts}
         addToCart = {addToCart}
        
        />
        
    ))
}