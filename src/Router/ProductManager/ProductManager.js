import React,{useEffect,useState} from 'react';
import './ProductManager.css'
import { useNavigate,useLocation } from 'react-router-dom';
import ProductDetail from '../../component/ProductDetail/ProductDetail'

const ProductManager = () => {
    const location = useLocation();
    const [chooseManager,setChooseManager] = useState(true);
    const  infor = location.state ;
    const navigate = useNavigate();
    useEffect(()=>{
        console.log()
        if(!infor){
            navigate('/')
        }
    },[])
    const showP = ()=>{
        setChooseManager(true);
    }
    const showU = ()=>{
        setChooseManager(false);
    }
    return (
        <div className='manager'>
            <div className='manager_detail'>
                <button onClick={showP} className={`product_btn ${chooseManager?'bg_green':''}`}> Sản phẩm</button>
                <button onClick={showU} className={`user_btn ${!chooseManager?'bg_green':''}`}> Người dùng</button>

            </div>
            <div className='managers'>
                {chooseManager?<ProductDetail></ProductDetail>:''}

            </div>
        </div>  
    );
};

export default ProductManager;