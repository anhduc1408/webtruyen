import React,{useState,useEffect} from 'react';
import './TopBanner.css'
    const images = [
        "https://cdn0.fahasa.com/media/magentothem/banner7/Laprap_Slide_T7_840x320.jpg",
        "https://cdn0.fahasa.com/media/magentothem/banner7/TrangDoChoiThang7_Resize_SlideBanner_T7_840x320_2.jpg",
        "https://cdn0.fahasa.com/media/magentothem/banner7/Diamond_T07_ThienLong_Slide_840x320_1.jpg",
        "https://cdn0.fahasa.com/media/magentothem/banner7/Trangthanhtoankhongtienmat_0724_Slidebanner_840x320.png",
        "https://cdn0.fahasa.com/media/magentothem/banner7/Backtoschool_0724_LDP_840x320.png"
    ]

const TopBanner = () => {
    const [autoSlide,setAutoSlide] = useState(true);
    const [currentSlide,setCurrentSlide] = useState(0);
    useEffect(()=>{
        if(autoSlide){
            const interval = setInterval(()=>{
                setCurrentSlide(preSlide =>(preSlide+1)%images.length)}
                ,2000)
                return ()=> clearInterval(interval);
        }

    },[autoSlide])
    const handleNextClick =()=>{
        setCurrentSlide(preSlide =>(preSlide+1)%images.length);
        setAutoSlide(false);
    }
    const handlePreClick =()=>{
        setCurrentSlide(preSlide =>(preSlide-1+ images.length)%images.length);
        setAutoSlide(false);
    }
    return (
            <div className='topBanner'>
                <div className='firstBanner'>
                    <span onClick={handlePreClick} className='btn_banner_left'></span>
                    <img className="imgFirstBanner" src={images[currentSlide]} alt={`Slide ${currentSlide}`}/>
                    <span  onClick={handleNextClick} className='btn_banner_right'></span>
                </div>
                <div  className='secondBanner'>
                    <img className='imgSecond' src = "https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/DoiTac_SubBanner_392x156_2.jpg" alt='dd'></img>
                    <img className='imgSecond' src = "https://cdn0.fahasa.com/media/wysiwyg/Thang-08-2024/VPbank392x156.png" alt="cs"></img>
                </div>
        </div>
    );
};

export default TopBanner;