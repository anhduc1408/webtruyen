import React,{useEffect,useState} from 'react';
import './BestSaler.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const BestSaler = () => {
    const navigate = useNavigate();
    const [bestSaler,setBestSaler] = useState();
    const[indexCurrent,setIndexCurrent]=useState(0);
    async function getProductBestSaler(){
        const respone = await axios.post('http://localhost:3001/getBestSaler')
        const getSlice=(items,cap)=>{
            const result=[];
            for(let count=0;count<items.length;count+=cap){
                result.push(items.slice(count,count+cap))
            }
            return result;
        }
        await setBestSaler(getSlice(respone.data,6));

    }
    const handlePreList = ()=>{
        setIndexCurrent((indexCurrent +1)%2)
    }
    const handleNextList = ()=>{
        setIndexCurrent((indexCurrent + 3)%2)
    }
    useEffect(()=>{
        getProductBestSaler();
    },[])
    function chooseProduct(e){
        navigate(`/ProductDetail/${e.productID}`,{state:e})
    }
    return (
        <div className="inner_best_saler">
          <div className="best_saler_header" >
            <img src='label-flashsale.svg' alt="jjj"></img>
            <div className='links'>
            <a className='link_best_saler' href='http://localhost:3000/'>XEM TẤT CẢ</a>
            <img  className='ico_link_best_saler' src='ico_arrow_gray.svg' alt=''></img>
            </div>
          </div>
          <div className='products_best_saler'>
          <span onClick={handlePreList} className='btn_banner_left'></span>
            {bestSaler?( bestSaler[indexCurrent].map((item,index)=>(
                <div className='div_best_saler' onClick={()=>chooseProduct(item)} key={index}>
                    <img className='img_best_saler' src={item.images} alt=''></img>
                    <h4>{item.productName}</h4>
                    <div className='mar'>
                        <h5>{item.productPrice} VND</h5>
                        <p>Đã Bán:</p>
                        <div className='progress'>
                        <span>Đã bán {item.selled}</span>
                            <div className='progress_value' style={{width: `${(item.selled/item.quantity)*100}%`}}></div>
                        </div>
                    </div>
                </div>
            ))):(<p>l</p>)}
            <span  onClick={handleNextList} className='btn_banner_right'></span>
          </div>
        </div>
    );
};

export default BestSaler;