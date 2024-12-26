import React,{useState,useRef} from 'react';
import axios from 'axios'
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import './SearchNavbar.css'

const SearchNavbar = () => {
    const navigate =  useNavigate();
    const searchNavbar = useRef()
    const[suggestItems,setSuggestItems] = useState([]);
    const[showSuggest,setShowSuggest] = useState(false);
    const[inputValue,setInputValue] = useState();
    const querySyntax = ' limit 3';
    const suggest = debounce(async(value)=>{
        console.log(value);
        setInputValue(value);
        const response = await axios.post('http://localhost:3001/suggest',{value,querySyntax});
        await setSuggestItems(response.data);
    },300)
    function closeSuggestPopup(){
        setShowSuggest(false)
    }
    function openSuggestPopup(){
        setShowSuggest(true)
        suggest('')
    }
    async function handleSearch(){
        navigate('/Search',{state:{value:inputValue}});
        await setSuggestItems([]);
        await setInputValue('');
        await setShowSuggest(false)
    }
    async function clickItem(e){
        navigate(`/ProductDetail/${e.productID}`,{state:e});
    }
    return (
        <div style={{width:'50%',height:'7vh'}}>
            <div className='searchNavbar' ref={searchNavbar}>
             <div className='div_Search'>
             <input className='Search_Navbar' onKeyDown={(event)=>{if(event.key === 'Enter'){handleSearch()}}} onClick={openSuggestPopup} onChange={(e)=>suggest(e.target.value)} type='text' placeholder='Search' />
             <input className='Submit_Search' onClick={handleSearch} type='Submit'></input>
             </div>
            <div className={`suggest_Popup ${showSuggest?'':'hide'}`}>
                {suggestItems?suggestItems.map((item,index)=>(
                    <div onClick={() => clickItem(suggestItems[index])} className='Items_Suggest' style={{borderBottom:'1px solid rgba(187, 187, 187, 0.486)'}}>
                        <img src={item.images} alt='' ></img>
                        <div className='infor_Items'>
                            {item.productName}<br/>
                            {item.categoryName}<br/>
                            Đã bán: {item.selled}/{item.quantity}<br/>
                            {item.productPrice} VND
                        </div>
                    </div>
                ))
                :''}
            </div>
        </div>
        <div className= {`close_Suggest ${showSuggest?'':'hide'}`} onClick={closeSuggestPopup}></div>
        </div>
    );
};

export default SearchNavbar;