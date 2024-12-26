import React,{useRef,useEffect,useState} from 'react';
import './Menu.css'

const Menu = () => {
    const menu = useRef(null);
    const [contentInner,setContentInner] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const contents= ['SÁCH TRONG NƯỚC', 'FOREIGN BOOK', 'VPP', 'ĐỒ CHƠI', 'LÀM ĐẸP', 'HÀNH TRANG ĐẾN TRƯỜNG', 'ĐỒ CHƠI THEO THƯƠNG HIỆU', 'BÁCH HÓA ONLINE'];
    
    useEffect(()=>{
        menu.current = document.querySelector('.menu');
        
    })

    const toggleMenu = ()=>{
        menu.current?.classList.toggle('hide');
    }

    const handleMouseEnter = (index,content) => {
        setHoveredButton(index);
        setContentInner(content);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };
    return (
        <div className='div_svg_menu'>
            <div className='icon_menu' onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
                <img  src='/ico_menu.svg ' alt='j' class="svg_icon_menu"></img>
                <img src='/icon_seemore_gray.svg' alt='k'  className='svg_icon_seemore'></img>
            </div>
            <div className='menu hide'>
                <div className='inner_menu ' onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
                    <div className='menu_left'>
                        <p className='pMenu_left'>Danh mục sản phẩm</p>
                        <ul className='ulMenu'>
                            {contents.map((content, index) => (
                                <li
                                key={index}
                                onMouseEnter={(e) => handleMouseEnter(index, content)}
                                onMouseLeave={handleMouseLeave}
                                className='liMenu'
                                style={{ backgroundColor: hoveredButton === index ? '#bdbaba7d' : 'white'}}
                                >
                                {content}
                                </li>
                            ))}
                            </ul>
                    </div>
                    <div id='contentInner'>
                        {contentInner}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;