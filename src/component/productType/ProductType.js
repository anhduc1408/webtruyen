import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './ProductType.css'

const ProductType = ({type}) => {
    const navigate = useNavigate();
    const [product,setProduct] =useState();
    async function getProduct(){
        const respone = await axios.post('http://localhost:3001/getProduct',{type});
        setProduct(respone.data);
    }
    useEffect(()=>{
        getProduct();
    },[])
    function chooseProduct(e){
        navigate(`/ProductDetail/${e.productID}`,{state:e});   
    }
    return (
        <div className='productType'>
            <div className='innerProductType'>
            <div className='TypeName'>
                {type}
            </div>
            <div className='productDetail'>
            {product?( product.map((item,index)=>(
                <div className='div_best_saler' style={{width:'16%'}} key={index} onClick={()=>chooseProduct(item)} >
                    <img className='img_best_saler' src={item.images} alt=''></img>
                    <h4>{item.productName}</h4>
                    <div className='mar'>
                        <h5>{item.productPrice} đ</h5>
                        <p>Đã Bán:</p>
                        <div className='progress'>
                        <span>Đã bán {item.selled}</span>
                            <div className='progress_value' style={{width: `${(item.selled/item.quantity)*100}%`}}></div>
                        </div>
                    </div>
                </div>
            ))):(<p>l</p>)}
            </div>
            </div>
        </div>
    );
};

export default ProductType;