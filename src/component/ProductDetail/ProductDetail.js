import React,{useEffect,useState} from 'react';
import AddProductPopup from '../addProductPopup/AddProductPopup'
import axios from 'axios'
import './ProductDetail.css'

const ProductDetail = () => {
    const [products,setProducts]=useState();
    const [listProduct,setListProduct] = useState();
    const [showPopup,setShowPopup] = useState(true);
    const [index,setIndex] = useState(0);
    
    const fetchData = async ()=>{
        const response = await axios.post('http://localhost:3001/fetchProduct');
        await setListProduct(response.data);
    }   
    useEffect(()=>{
        fetchData();
    },[])
    const SliceDataItems =(arr,cap)=>{
        const result=[];
        if(listProduct){
            for(let count =0;count<arr.length;count +=cap){
                result.push(arr.slice(count,count+cap));
            }
        }
        return result;
    }
    useEffect( ()=>{
        if(products && products.length > 0 && index >= products.length){
            console.log(1)
            setIndex(products.length -1);
            console.log(2)
        }
    },[products])
    useEffect(()=>{
        console.log(listProduct)
        setProducts(SliceDataItems(listProduct,10))
    },[listProduct])
    const deleteProducts= async (item,i)=>{
        console.log(index);
        const confirmDelete = window.confirm('Are you sure you want to delete item id '+item.id+' ?');
        if(confirmDelete){
            const response = await axios.post('http://localhost:3001/delete',listProduct[10*index + i]);
            if(response === 'ok'){
                alert('Delete success!')
                setListProduct((preProduct)=>[
                    ...preProduct.slice(0,10*index + i ),
                    ...preProduct.slice(10*index + i+1  )
                ])
            }
        };
    }
    async function btnClick(i){
        console.log(products.length);
        await setIndex((index + i + products.length) % products.length);
    }
    async function addProduct(){
        setShowPopup(false);
    }
    async function hideProduct(){
        setShowPopup(true);
    }
    return (
        <div className='product_show'>
            <button onClick={addProduct} className='btn_add'>+</button>
            <table className='table_product'>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>price</th>
                    <th>amount</th>
                    <th>selled</th>
                    <th>brand</th>
                    <th>type</th>
                    <th>description</th>
                    <th>image</th>
                    <th></th>
                </tr>
                {products && products[index]? products[index].map((item, index) =>(
                    <tr>
                    <th>{item.productID}</th>
                    <th>{item.productName}</th>
                    <th>{item.productPrice} VND</th>
                    <th>{item.quantity}</th>
                    <th>{item.selled}</th>
                    <th>{item.BrandName}</th>
                    <th>{item.categoryName}</th>
                    <th>{item.productDetail}</th>
                    <th><img style={{height:'10vh',objectFit:'cover'}} src={item.images} alt=''/></th>
                    <th><button onClick={()=>deleteProducts(item,index)}>Delete</button> 
                    <button>Update</button></th>
                    </tr>
                )):''}
            </table>
            <button onClick={()=>btnClick(-1)} className=' btn'>&lt;</button>
            <button onClick={()=>btnClick(1)} className='btn'>&gt;</button>
            <div className={`${showPopup?'hide':''}`}>
                <AddProductPopup hideProduct={hideProduct}></AddProductPopup>
            </div>
        </div>
    );
};

export default ProductDetail;