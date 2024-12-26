import React from 'react';
import './InforPopup.css'

const InforPopup = ({infor,CloseInforPopup}) => {
    function closePopupInfor(e){
        if(e.target === e.currentTarget) CloseInforPopup();
    }
    return (
        <div className='inforPopup' onClick={closePopupInfor}>
            <div className='innerInfor'>
            <div className='userInputLogIn'>
            <label>Name</label>
                    <input className='userinfor' disabled  type='text' value={infor.name}></input>
                    <label>Email</label>
                    <input className='userinfor' disabled  type='text' value={infor.email}></input>
                    <label>Phone</label>
                    <input className='userinfor' disabled  type='tel' value={infor.phone} pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}"></input>
                    <label>Address</label>
                    <input className='userinfor' disabled  value={infor.address} type='text'></input>
                    <label>Money</label>
                    <input className='userinfor' disabled  value={infor.money} type='number'></input>
            </div>
            </div>
        </div>
    );
};

export default InforPopup;