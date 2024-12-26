import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import SignPopup from '../SignPopup/SignPopup';
import InforPopup from '../InforPopup/InforPopup'
import './FunctionNavbar.css'

const FunctionNavbar = ({status}) => {
    const navigate = useNavigate();
    const[signHide,setSignHide] = useState(true);
    const[inforPopup,setInforPopup] = useState(true)
    const[signedHide,setSignedHide] = useState(true);
    const[typeSign,setTypeSign] = useState();
    const[signPopup,setSignPopup] = useState(true);
    const handleEnterSign = ()=>{
        if(status === 'Not Sign') setSignHide(false);
        else setSignedHide(false)

    }
    const handleOutSign = ()=>{
        setSignHide(true);
        setSignedHide(true)
    }
    const clickSign = (e)=>{
        const values = e.target.value;
        console.log(values)
        setTypeSign(values); 
        setSignPopup(false);
    }
    const closeSign = ()=>{
        setSignPopup(true);
    }
    const clickInfor = ()=>{
        
        setInforPopup(false);
    }
    const closeInfor = ()=>{
        setInforPopup(true);
    }
    async function LogOut(){
        localStorage.removeItem('token');
        const respone = await axios.post('http://localhost:3001/LogOut');
        navigate('/')
    }
    const Product = ()=>{
        navigate('/product',{state:{infor:status}});
    }
    function cart(){
        navigate('/Cart');
    }
    return (
        <div className='functionNavbar'>
            <div className='icon'>
                <span className='Notification_icon'></span>
                <div>Thông Báo</div>
            </div>
            <div onClick={()=>cart()} className='icon'>
                <span className='cart_icon'></span>
                <div>Giỏ Hàng</div>
            </div>
            <div onMouseEnter={handleEnterSign} onMouseLeave={handleOutSign} className='icon'>
                <span className='account_icon'></span>
                <div>Tài Khoản</div>
            </div>
            {signHide?'':<div onMouseLeave={handleOutSign}  onMouseEnter={handleEnterSign} className='MenuSign'>
                <button onClick={clickSign} value='Đăng nhập' className='btn1Sign'>Đăng nhập</button>
                <button onClick={clickSign} value='Đăng ký' className='btn2Sign'>Đăng ký</button>
            </div>}
            
            {signedHide?'':<div onMouseLeave={handleOutSign}  onMouseEnter={handleEnterSign} className={`MenuSign ${status.roleID > 1?'changeH':''}`}>
                <button onClick={clickInfor} className='btn1Sign'>Thông tin</button>
                <button onClick={LogOut} className='btn2Sign'>Đăng xuất</button>
                {status.roleID > 1?(<button onClick={Product} className='btn1Sign'>Hàng hóa</button>):''}
            </div>}
            
            {inforPopup?'':<InforPopup infor={status} CloseInforPopup = {closeInfor}></InforPopup>}
            {signPopup? '':<SignPopup  type={typeSign}  closeSignPopup={closeSign} />}
        </div>
    );
};

export default FunctionNavbar;