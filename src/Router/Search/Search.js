import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import axios from 'axios';
import Navbar from '../../component/navbar/Navbar'
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css'
import { _checkPlugin } from 'gsap/gsap-core';


const Search = () => {
  const rangeRef = useRef();
  const mintool = useRef();
  const maxtool = useRef();
  const minRef = useRef();
  const minRefCopy = useRef();
  const maxRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const {value} = location.state || {};
  const user = JSON.parse(localStorage.getItem('user'));
  const [products,setProducts] = useState([]);
  const [productsCopy,setProductsCopy] = useState([]);
  const [loading,setLoading] = useState(false);
  const [array,setArray]=useState({
    price:[],
    category:[],
    BrandName:[]
  });
  const [filter,setFilter]=useState({
    price:[],
    category:[],
    BrandName:[]
  });
  const [maxValue,setMaxValue] = useState();
  const [minValue,setMinValue] = useState();
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:3001/suggest', {value});
            await setLoading(false)
            await setProducts(response.data);
        } catch (error) {
            console.error("Error fetching data:", error); // Xử lý nếu có lỗi
        }
    };  
    fetchData(); // Gọi hàm fetchData bên trong useEffect
}, [value]);  
useEffect(()=>{
  
  const newArray = {
    price:[],
    category:[],
    BrandName:[]
  };
  if(products.length >0){
    products.map((item)=>{
      //BRAND
      const index = newArray.BrandName.findIndex(item1 => item1[0] === item.brandName);
      if(index !== -1) newArray.BrandName[index][1] +=1;
      else newArray.BrandName.push([item.brandName,1]);
      //CATEGORY
      const index1 = newArray.category.findIndex(item1 => item1[0] === item.categoryName);
      if(index1 !== -1) newArray.category[index1][1] +=1;
      else newArray.category.push([item.categoryName,1]);
      //PRICE
      const index2 = newArray.price.findIndex(item1 => item1[0] === item.productPrice);
      if(index2 !== -1) newArray.price[index2][1] +=1;
      else newArray.price.push([item.productPrice,1]);
    })
    newArray.price.sort((a, b) => b[0] - a[0]);
    setLoading(true);
    setProductsCopy(products);
    setArray(newArray);
  }
},[products])
  function clickProduct(e){
    navigate(`/ProductDetail/${e.productID}`,{state:e});
  }
  useEffect(()=>{
    if(loading){
      changeInput();
    }
  },[loading])
  useEffect(()=>{
    if(rangeRef.current && array.price.length>0){
      const max = array.price[0][0];
      rangeRef.current.style.right = (1-(maxValue / max))*100 +'%';}
  },[maxValue])
  useEffect(()=>{
    if(rangeRef.current && array.price.length>0){
      const max = array.price[0][0];
      rangeRef.current.style.left = (minValue /max )*100 +'%';}
  },[minValue])
  async function changeInput(){
    await setMaxValue(Number(maxRef.current.value));
    await setMinValue(Number(minRef.current.value));
    if(parseFloat(minRef.current.value) > parseFloat(maxRef.current.value)){
      minRefCopy.current = minRef.current;
      minRef.current = maxRef.current;
      maxRef.current = minRefCopy.current;
      minRef.current.classList.add("antiquewhite");
      maxRef.current.classList.remove("antiquewhite");
    }
  }
  function changeBrand(brand){
    setFilter((prev)=>{
      const copy = prev;
      if(copy.BrandName.includes(brand)){
        copy.BrandName = copy.BrandName.filter((item) => item !== brand)
      }else copy.BrandName.push(brand);
      return copy
    }) 
    console.log(filter)
  }
  function changeType(category){
    setFilter((prev)=>{
      const copy = prev;
      if(copy.category.includes(category)){
        copy.category = copy.category.filter((item) => item !== category)
      }else copy.category.push(category);
      return copy
    }) 
    console.log(filter)
  }
  async function changePrice(price){
    await setFilter((prev)=>{
      const copy = prev;
      if(copy.price.includes(price)){
        copy.price = copy.price.filter((item) => item !== price)
      }else copy.price.push(price);
      return copy
    }) 
    if(filter.price.length >1){
      maxRef.current.value = Math.max(...filter.price)+1;
      minRef.current.value = Math.min(...filter.price)-1;
      changeInput();
    } 
  }
  async function filterFunc(){
    let tmp = products;
    console.log(tmp)
    if(filter.BrandName.length >0){
      tmp = tmp.filter((item)=> filter.BrandName.includes(item.brandName));
      console.log(tmp)
    }
    if(filter.category.length >0){
      tmp= tmp.filter((item)=> filter.category.includes(item.categoryName));
    }
    if(maxValue !== minValue){
      tmp = tmp.filter((item)=> item.productPrice > minValue && item.productPrice < maxValue);
    }
    console.log(tmp)
    await setProductsCopy(tmp);
  }
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
        <div className='contentSearch'>
          <div className='innerSearch'>
          {loading  ?(
            <div className='filter'>
              <h2  style={{color:'red',fontWeight:"500",padding:' 0 0 15px 15px',borderBottom:'2px solid #F0F0F0'}}>Lọc theo</h2>
              <div className='detailFilter'>
                <h4 style={{fontWeight:500}}>Nhà phân phối</h4>
                {array.BrandName.map(item=>(
                  <div>
                  <input type='checkbox' onChange={()=>changeBrand(item[0])}/><label>{item[0]}</label>
                  </div>
                ))}
              </div>
              <div className='detailFilter'>
                <h4 style={{fontWeight:500}}>Loại sản phẩm</h4>
                {array.category.map(item=>(
                  <div>
                  <input type='checkbox' onChange={()=>changeType(item[0])}/><label>{item[0]}</label>
                  </div>
                ))}
              </div>
              <div className='detailFilter'>
                <h4 style={{fontWeight:500}}>Giá</h4>
                <div className='innerRange'>
                  <div className='input'>
                  
                  <div ref={rangeRef} className='range' style={{position:'absolute'}}>
                  <div ref={mintool} className='mintool'>${minValue}</div>
                  <div ref={maxtool} className='maxtool'>${maxValue}</div>
                  </div>
                  <input ref={minRef}  type='range' onInput={changeInput} className='inputRange aquamarine antiquewhite' min={0} max={array.price[0][0]}/>
                  <input ref={maxRef}  type='range' onInput={changeInput}  className='inputRange aquamarine' min={0} max={array.price[0][0]}/>
                  </div>
                </div>
                <div>
                {array.price.map(item=>(
                  <div>
                  <input type='checkbox' onChange={()=>changePrice(item[0])} /><label>{item[0]}</label>
                  </div>
                ))}
                </div>  
              </div>
              <button className='buttonFilter' onClick={()=>filterFunc()}>Filter</button>
            </div>):''}
            <div className='detailProduct'>
            {productsCopy?( productsCopy.map((item,index)=>(
                <div onClick={()=> clickProduct(products[index])} className='div_best_saler' style={{width:'20%',height:'30vh',margin:'0 2.5%'}} key={index}>
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
    </div>
  );
};

export default Search;