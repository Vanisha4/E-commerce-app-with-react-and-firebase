import React from 'react'
export const individualProducts = ({individualProducts , AddToCart}) => {
    // console.log(individualProducts);
    const handleAddToCart=()=>{
        AddToCart(individualProducts);
    }
    return(
        <div className="product">
  <div className="product-img">
    <img src={individualProduct.url} alt="product-img" />
  </div>
  <div className="product-text title">{individualProduct.title}</div>
  <div className="product-text description">{individualProduct.description}</div>
  <div className="product-text price">$ {individualProduct.price}</div>
  <div className="btn btn-danger btn-md cart-btn"onClick={handleAddToCart}>ADD TO CART</div>
</div>
    )
}