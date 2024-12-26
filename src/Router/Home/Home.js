import React,{useEffect,useState} from "react";
import axios from 'axios'
import "./Home.css";
import {useNavigate} from 'react-router-dom'
import Navbar from "../../component/navbar/Navbar";
import TopBanner from '../../component/topBanner/TopBanner'
import Categary from '../../component/Categary/Categary'
import BestSaler from '../../component/bestSaler/BestSaler'
import ProductType from '../../component/productType/ProductType'

const Home = () => {
  const navigate = useNavigate();
  const [token,setToken]= useState(localStorage.getItem('token')|| '')
  async function check (){
    if(token){
      const respone = await axios.post('http://localhost:3001/navigate',{},{headers: {authorization: token}});
      navigate(`/Signed/${respone.data[0].id}`,{state:{user:respone.data[0]}});
    }
  }
  useEffect(()=>{
    check();
  })
  return (

    <div>
      <div className="header_home">
        <div className="img_top_home">
          <img
            src="/NCC_0624_HuyHoang_header_1263x60.png"
            className="img_top"
            alt="cd"
          ></img>
        </div>
        <Navbar status={'Not Sign'}></Navbar>
      </div>
      <div className="content">
        <div className="inner">
          <TopBanner></TopBanner>
          <Categary></Categary>
        </div>
      </div>
      <div className="best_saler">
        <BestSaler></BestSaler>
      </div>
      <ProductType type={'Shirt'}></ProductType>
    </div>
  );
};

export default Home;
