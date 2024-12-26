import React from 'react';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import FunctionNavbar from '../functionNavbar/FunctionNavbar'
import SearchNavbar from '../SearchNavbar/SearchNavbar';
import Menu from '../headerMenu/Menu'

const Navbar = ({status}) => {
    const navigate = useNavigate();
    function naviga(){
        navigate('/');
    }
    return (
        <div className='navbar'>
                <img style={{cursor:'pointer'}} className='logo_navbar' onClick={naviga} src='http://localhost:3000/logo.png' alt='ds'></img>
                <Menu></Menu>
                <SearchNavbar></SearchNavbar>
                <FunctionNavbar status={status}></FunctionNavbar>
        </div>
    );
};

export default Navbar;