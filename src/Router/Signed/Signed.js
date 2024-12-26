import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../component/navbar/Navbar";
import BestSaler from '../../component/bestSaler/BestSaler'
import TopBanner from '../../component/topBanner/TopBanner'
import Categary from '../../component/Categary/Categary'
import ProductType from '../../component/productType/ProductType'

const Signed = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate =  useNavigate();
  useEffect(() => {
    if (!user) {
      console.log(user); // vẫn log ra giá trị undefined của user
      navigate('/'); // điều hướng về trang chủ
    }
  }, []);
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
            <Navbar status={user}></Navbar>
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
            <ProductType type={'Kid'}></ProductType>
            <ProductType type={'Home clothes'}></ProductType>
        </div>
      );
    };

export default Signed;