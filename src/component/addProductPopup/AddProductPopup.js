import React,{useState} from 'react';
import axios from 'axios'
import './AddProductPopup.css'

const AddProductPopup = ({hideProduct}) => {
    const [formData,setFormData] = useState({
        name:'',
        category:'',
        price:'',
        quantity:'',
        selled:'',
        brand:'',
        detail:'',
        image:null
    });
    function clickProduct(e){
        if(e.currentTarget === e.target) hideProduct();
    }
    async function onsubmit(e){
        e.preventDefault();
        const data = new FormData();
        data.append('name',formData.name);
        data.append('type',formData.type);
        data.append('price',formData.price);
        data.append('amount',formData.amount);
        data.append('selled',formData.selled);
        data.append('rate',formData.rate);
        data.append('image',formData.image);
        console.log(data);
        const response = await axios.post('http://localhost:3001/addProduct',data,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
        });
        console.log(response);
    }
    return (
        <div onClick={(e)=>clickProduct(e)} className='addProductPopup'>
        <form>
            <div className='innerAddProduct'>
                    <div className='inputProduct'>
                        <label>Name</label>
                        <input type='text' onChange={(e)=>setFormData(formData=>({
                            ...formData, name:e.target.value
                        }))}></input>
                    </div>
                    <div className='inputProduct'>
                        <label>Loại</label>
                        <input type='text'onChange={(e)=>setFormData(formData=>({
                            ...formData, category:e.target.value
                        }))}></input>
                    </div>
                    <div className='inputProduct'>
                    <label>Price</label>
                    <input type='number' onChange={(e)=>setFormData(formData=>({
                            ...formData, price:e.target.value
                        }))}></input>
                    </div>
                    <div className='inputProduct'>
                    <label> Quantity</label>
                    <input type='number' onChange={(e)=>setFormData(formData=>({
                            ...formData, quantity:e.target.value
                        }))}></input>
                    </div>
                    <div className='inputProduct'>
                    <label>Selled</label>
                    <input type='number' onChange={(e)=>setFormData(formData=>({
                            ...formData, selled:e.target.value
                        }))}></input>
                    </div>
                    <div className='inputProduct'>
                    <label>brand</label>
                    <input type='number' step="0.1" onChange={(e)=>setFormData(formData=>({
                            ...formData, brand:e.target.value
                        }))}></input>
                    </div>
                    <div className='inputProduct'>
                    <label>Description</label>
                    <input type='text' onChange={(e)=>setFormData(formData=>({
                            ...formData, detail:e.target.value
                        }))}></input>
                    </div>
                    <div className='inputProduct'>
                    <label>Image</label>
                    <input type='file'  onChange={(e)=>setFormData(formData=>({
                            ...formData, image:e.target.files[0]
                        }))}></input>
                    </div>
                    <input type='submit' onClick={(e)=>onsubmit(e)} value='Submit' />
            </div>
            </form>
        </div>
    );
};

export default AddProductPopup;