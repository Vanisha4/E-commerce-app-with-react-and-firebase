import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { auth, fs } from '../Config/config';
import { cartProducts } from './cartProducts'
import StripeCheckout from 'react-stripe-checkout';

export const Home = (props) => {
  // Function to get current user
  function GetCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection('users')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data()?.FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);

    return user;
  }

  const user = GetCurrentUser();

  // State for cart products
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart' + user.uid).onSnapshot((snapshot) => {
          const newCartProducts = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProducts);
        });
      } else {
        console.log('User is not signed in to retrieve cart');
      }
    });
  }, []);

  // Calculating total quantity and price
  const totalQty = cartProducts.reduce((acc, product) => acc + product.qty, 0);
  const totalPrice = cartProducts.reduce((acc, product) => acc + product.TotalProductPrice, 0);

  let Product;

  // Function to increase product quantity
  const CartProductIncrease = (cartProduct) => {
    Product = { ...cartProduct };
    Product.qty += 1;
    Product.TotalProductPrice = Product.qty * Product.price;

    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart' + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log('Increment added');
          });
      } else {
        console.log('User is not logged in to increment');
      }
    });
  };

  // Function to decrease product quantity
  const CartProductDecrease = (cartProduct) => {
    Product = { ...cartProduct };
    if (Product.qty > 1) {
      Product.qty -= 1;
      Product.TotalProductPrice = Product.qty * Product.price;

      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection('Cart' + user.uid)
            .doc(cartProduct.ID)
            .update(Product)
            .then(() => {
              console.log('Decrement applied');
            });
        } else {
          console.log('User is not logged in to decrement');
        }
      });
    }
  };

  // State and logic for total products
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart' + user.uid).onSnapshot((snapshot) => {
          setTotalProducts(snapshot.docs.length);
        });
      }
    });
  }, []);

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br />
      {cartProducts.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="product-box">
            <CartProducts
              cartProducts={cartProducts}
              CartProductIncrease={CartProductIncrease}
              CartProductDecrease={CartProductDecrease}
            />
          </div>
          <div className="summary-box">
            <h5>Cart Summary</h5>
            <br />
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>${totalPrice.toFixed(2)}</span>
            </div>
            <br />
            <StripeCheckout
              stripeKey="YOUR_STRIPE_PUBLIC_KEY"
              token={(token) => console.log(token)}
              amount={totalPrice * 100} // Stripe expects the amount in cents
              name="MarketMate Checkout"
              currency="USD"
            />
          </div>
        </div>
      )}
      {cartProducts.length === 0 && (
        <div className="container-fluid text-center">No products to show</div>
      )}
    </>
  );
};
