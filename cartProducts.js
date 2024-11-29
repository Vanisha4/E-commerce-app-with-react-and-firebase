import React,{useState,useEffect} from 'react'
export const cartProducts = (cartProducts, CartProductIncrease, CartProductDecrease) => {
    return cartProducts.map((cartProduct)=>(
        <individualCartPro key={cartProduct.ID} cartProduct={cartProduct}
        CartProductIncrease = {cartProduct}
        CartProductDecrease = {cartProduct}
        />
    ))
    
}