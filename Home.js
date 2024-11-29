import React,{useState,useEffect} from 'react'
import { Navbar } from './Navbar'
import { products } from './Products'
import {auth,fs} from '../Config/config'
export const Home = (props) => {

    function GetUserUid(){
        const [uid, setUserUiid] =useState(null);
        useEffect(()=>{
            auth.onAuthStatechanged(user=>{
                if (user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }
const uid = GetUserUid();
        function GetCurrentUser(){
            const [user,setUser]=useState(null);
            useEffect(()=>{
                    auth.onAuthStatechanged(user=>{
                        if(user){
                            fs.collection('users').doc(user.uid).get().then(snapshot=>{
                                setUser(snapshot.data().FullName);
                            })
                        }
                        else{
                            setUser(null);
                        }
                    })
            },[])
            return user;
        }
            const user = GetCurrentUser();
            // console.log(user);
        const [Products, setProducts] = useState('');
        const getProducts = async ()=>{
            const products = await fs.collection('products').get();
            const productsArray = [];
            for(var snap of products.docs){
                var data = snap.data();
                data.ID = snap.id;
                productsArray.push({
                    ...data
                })
                if(productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
  }
  useEffect(()=>{
    getProducts
  },[])
    const [TotalProduct, setTotalProduct]= useState('');
     useEffect(()=>{
        auth.onAuthStatechanged((user)=>{
            if(user){
                fs.collection('Cart'+ user.uid).onSnapshot((snapshot)=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
     },[])
  let Product;
  const AddToCart = (product) =>{
    if(uid!==null){
        console.log(product);
        Product = product;
        Product['qty']=1;
        Product['TotalProductPrice']=Product.qty*Product.price;
        fs.collection('Cart'+ uid).doc(product.ID).set(Product).then(()=>{
            console.log("Successfully Added to your cart..")
        })
    }
    else{
        props.history.push('/login');
    }
  }
    return (
        <>
           
           <Navbar user={user} TotalProducts={TotalProducts}/>
            <br></br>
           {products.length > 0 && (
            <div className='container-fluid' >
                <h1 className='text-center'>Products</h1>
                <div className='products-box'>
                    <Products products ={products} AddToCart={AddToCart}/>
                </div>
                
            </div>
           )}
           {products.length < 1 && (
            <div className='container-fluid'>Please wait...</div>
           )}
        </>
    )
}