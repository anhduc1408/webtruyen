import React,{useState,useEffect} from 'react';
import './SignPopup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Sign = ({type,closeSignPopup}) => {
    const navigate = useNavigate();
    const [types,setType]= useState();
    const [inputValid,setInputValid]= useState(true);
    const [inputType, setInputType] = useState('password');
    const [inputValues,setInputValues] = useState({
        emailPhone:null,
        password:null
    })
    const [inputSignUp,setInputSignUp] = useState({
        name:null,
        roleID:1,
        phone:null,
        email:null,
        address:null,
        password:null
    })

  const toggleInputType = () => {
    setInputType(prevType => prevType === 'text' ? 'password' : 'text');
  };
    const chooseType = async(value)=>{
        setInputValid(true);
        console.log(value);
        await setType(value);
    }
    function updateEmail(value){
        setInputValues({
            ...inputValues,
            emailPhone : value,
        });
    }
    function updatePassword(value){
        setInputValues({
            ...inputValues,
            password : value,
        });

    }
    function updateNameSignUp(value){
        setInputSignUp({
            ...inputSignUp,
            name : value,
        });

    }
    function updateEmailSignUp(value){
        setInputSignUp({
            ...inputSignUp,
            email : value,
        });

    }
    
    function updatePhoneSignUp(value){
        setInputSignUp({
            ...inputSignUp,
            phone : value,
        });

    }
    function updatePasswordSignUp(value){
        setInputSignUp({
            ...inputSignUp,
            password : value,
        });

    }
    function updateADSignUp(value){
        setInputSignUp({
            ...inputSignUp,
            address : value,
        });

    }
    async function submitInput(){
        try {
            const respone = await axios.post('http://localhost:3001/signIn',{inputValues})
            console.log(respone);
            if(respone.data === "") setInputValid(false);
            else{ 
                setInputValid(true);
                console.log(respone.data.formattedRows[0])
                localStorage.setItem('token',respone.data.token);
                localStorage.setItem('user',JSON.stringify(respone.data.formattedRows[0]));
                navigate(`/Signed/${respone.data.formattedRows[0].id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function submitInputSignUp(){ 
        try {
            console.log(inputSignUp);
            const respone = await axios.post('http://localhost:3001/signUp',{inputSignUp})
            if(respone.data.formattedRows.length === 0) setInputValid(false);
            else{ 
                console.log(respone.data)
                setInputValid(true);
                localStorage.setItem('token',respone.data.token);
                localStorage.setItem('user',JSON.stringify(respone.data.formattedRows[0]));
                navigate(`/Signed/${respone.data.formattedRows[0].id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }
    function closeSign(e){
        if(e.target === e.currentTarget) closeSignPopup();
        console.log(type)
    }
    return (
        <div className='Sign' onClick={(e)=>closeSign(e)}>
            <div className={`innerSign ${types==='Đăng ký'   ?'showLogUp':'show'} ${type===undefined   ?'hide':''} `}>
                <div className='typePopup'>
                    <div onClick={(e)=>chooseType('Đăng nhập')} className= {`nameType ${types==='Đăng nhập'?'correctType':''}`} >Đăng nhập</div>
                    <div onClick={(e)=>chooseType('Đăng ký')} className= {`nameType ${types==='Đăng nhập'?'':'correctType'}`} >Đăng ký</div>
                </div>
                <div className={`userInputLogIn ${types==='Đăng nhập'?'':'hide'}`}>
                    <label>Số điện thoại/Email</label>
                    <input className='userinfor' type='text' onChange={(e)=>updateEmail(e.target.value)} placeholder='Nhập số điện thoại hoặc email'></input>
                    <label>Mật khẩu</label>
                    <div className='containerPass'>
                        <input id=' inforPasss' className='userinfor' type={inputType} onChange={(e)=>updatePassword(e.target.value)} placeholder='Nhập mật khẩu'></input>
                        <div onClick={toggleInputType} className='visiable'>{inputType ==='text' ? 'Ẩn' : 'Hiện'}</div>
                    </div>
                    <div className={`${inputValid?'hide':'showWarm'}`}>Không có tài khoản của bạn trong hệ thống !</div>
                    <input className='submit_user' onClick={()=>submitInput()} type='submit'></input>
                </div>
                <div className={`userInputLogIn ${types==='Đăng nhập'?'hide':''}`}>
                <label>Name</label>
                    <input className='userinfor' type='text' onChange={(e)=>updateNameSignUp(e.target.value)} placeholder='Nhập tên'></input>
                    <label>Email</label>
                    <input className='userinfor' type='text' onChange={(e)=>updateEmailSignUp(e.target.value)} placeholder='Nhập số điện thoại hoặc email'></input>
                    <label>Phone</label>
                    <input className='userinfor' type='tel' pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}" onChange={(e)=>updatePhoneSignUp(e.target.value)} placeholder='Nhập số điện thoại'></input>
                    <label>Address</label>
                    <input className='userinfor' placeholder='Nhập địa chỉ' type='text'  onChange={(e)=>updateADSignUp(e.target.value)}></input>
                    <label>Mật khẩu</label>
                    <div className='containerPass'>
                        <input id=' inforPasss' className='userinfor' type={inputType} onChange={(e)=>updatePasswordSignUp(e.target.value)} placeholder='Nhập mật khẩu'></input>
                        <div onClick={toggleInputType} className='visiable'>{inputType ==='text' ? 'Ẩn' : 'Hiện'}</div>
                    </div>
                    <div className={`${inputValid?'hide':'showWarm'}`}>Đã có tài khoản của bạn trong hệ thống !</div>
                    <input className='submit_user' onClick={()=>submitInputSignUp()} type='submit'></input>
                </div>
                
            </div>
        </div>
    );
};

export default Sign;