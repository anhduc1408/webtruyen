import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./ProductDetail.css";
import Navbar from "../../component/navbar/Navbar";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductType from "../../component/productType/ProductType";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
  const navigate = useNavigate();
  const [seeMore, setSeeMore] = useState(false);
  const decriptionRef = useRef();
  const productIntroRef = useRef();
  const prodductCoRef = useRef();
  const [gege,setGege] = useState();
  const [showPolicy, setShowPolicy] = useState(false);
  const [wholesale, setWholesale] = useState(false);
  const [showTimeShip, setShowTimeShip] = useState(false);
  const [saddCart, setSAddCart] = useState(0);
  const location = useLocation();
  const product = location.state;
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState({
    userID:user.id,
    productID: product.productID,
    amount:1,
    price:product.productPrice
  });
  useEffect(() => {
    const h = decriptionRef.current.offsetHeight;
    if (seeMore) {
      gsap.to(decriptionRef.current, {
        height: "auto",
        duration: 0.5,
        onComplete: () => {decriptionRef.current.classList.remove("pseudo")}
      });
    } else {
      gsap.to(decriptionRef.current, {
        height: "300px",
        duration: 0.5,
        onComplete: () => {decriptionRef.current.classList.add("pseudo")}
      });
    }
    
    const timer = setTimeout(() => {
      setGege(prodductCoRef.current.getBoundingClientRect().height);
      return () => clearTimeout(timer);
    }, 550);
  }, [seeMore]);
  
  useLayoutEffect(()=>{
    ScrollTrigger.killAll();
    ScrollTrigger.refresh();
    const vh = window.innerHeight /100;
    const vh3 = vh*3;
    const leftPro =(window.innerWidth - 1230)/2;
    const heightPro1 = vh3 + productIntroRef.current.getBoundingClientRect().height
    gsap.registerPlugin(ScrollTrigger);
     ScrollTrigger.create({
      trigger: prodductCoRef.current,
      start:`top ${vh3}px`,
      end:`${gege}px ${heightPro1}px`,  
      scrub: 1,
      onEnter:()=>{
        gsap.to(productIntroRef.current,{
          position:'fixed',
          bottom:'auto',
          top:`${vh3}px`,
          width:'430px',
          left:`${leftPro}px`,
          duration:0
        })
      },
      onEnterBack:()=>{
        gsap.to(productIntroRef.current,{
          position:'fixed',
          top:`${vh3}px`,
          width:'430px',
          bottom:'auto',
          left:`${leftPro}px`,
          duration:0
        })
      },
      onLeave:()=>{
        gsap.to(productIntroRef.current,{
          position:'absolute',
          bottom:'0',
          top:`auto`,
          left:`0`,
          width:'430px',
          duration:0
        })
      },
      onLeaveBack:()=>{
        gsap.to(productIntroRef.current,{
          position:'absolute',
          bottom:'auto',
          top:`0`,
          left:`0`,
          width:'430px',
          duration:0
        })
      }
    })  
    
  },[gege])
  
  async function addCart(){
    const response = await axios.post('http://localhost:3001/addCart',{cart});
    if(response.data === 'success') {setSAddCart(1);}
    else if(response.data === 'error normal') setSAddCart(3)
    else {setSAddCart(2)  }setTimeout(hideAddCart, 2000);
  }
  function clickSeeMore() {
    setSeeMore(!seeMore);
  }
  function showTime() {
    setShowTimeShip(true);
  }
  function searchBrand(text) {
    navigate("/Search", { state: { value: text } });
  }
  function showPoli() {
    setShowPolicy(true);
  }
  function showWholesale() {
    setWholesale(true);
  }
  function hideTime() {
    setShowTimeShip(false);
    setWholesale(false);
    setShowPolicy(false);
  }
  function hideAddCart(){
    setSAddCart(0);
  }
  setTimeout(hideAddCart,1000)
  return (
    <div className="productDetailCom">
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
      <div className="contentProduct">
        <div className="innerProduct">
          <div ref={productIntroRef} className="productIntro">
            <img className="imgProduct" src={product.images} alt=""></img>
            <h3 style={{ color: "#838181" }}>{product.productName}</h3>
            <div style={{ width: "100%" }}>
              <button onClick={()=>addCart()} className="buttonProduct1">
                <span className="cart_icon_red"></span> Thêm vào giỏ hàng
              </button>
              <button className="buttonProduct2">Mua ngay</button>
            </div>
            <div
              style={{ position: "relative", width: "100%", marginTop: "30px" }}
            >
              <h3 style={{ display: "inline", fontWeight: "500" }}>
                Chính sách ưu đãi của Fahasa
              </h3>
              <p onClick={() => showTime()}>
                <span style={{ fontWeight: "500", cursor: "pointer" }}>
                  Thời gian giao hàng:{" "}
                </span>
                Giao nhanh và uy tín{" "}
                <img
                  className="imgSeeMore"
                  alt="s"
                  src="/icon_seemore_gray.svg"
                ></img>
              </p>
              <p onClick={() => showPoli()}>
                <span style={{ fontWeight: "500", cursor: "pointer" }}>
                  Chính sách đổi trả:{" "}
                </span>
                Đổi trả miễn phí toàn quốc{" "}
                <img
                  className="imgSeeMore"
                  alt="s"
                  src="/icon_seemore_gray.svg"
                ></img>
              </p>
              <p onClick={() => showWholesale()}>
                <span style={{ fontWeight: "500", cursor: "pointer" }}>
                  Chính sách khách sỉ:{" "}
                </span>
                Ưu đãi khi mua số lượng lớn{" "}
                <img
                  className="imgSeeMore"
                  alt="s"
                  src="/icon_seemore_gray.svg"
                ></img>
              </p>
            </div>
          </div>
          <div ref={prodductCoRef} className="productDetailCo">
            <div className="productDetail1">
              <h2 style={{ color: "#838181" }}>{product.productName}</h2>
              <table
                className="table2"
                style={{
                  width: "100%",
                  height: "10vh",
                  fontWeight: "600",
                  fontSize: "medium",
                }}
              >
                <tr>
                  <td>
                    <span>
                      Nhà sản xuất:{" "}
                      <span
                        style={{ color: "#2489F4", cursor: "pointer" }}
                        onClick={() => searchBrand(product.brandName)}
                      >
                        {product.brandName}
                      </span>
                    </span>
                  </td>
                  <td>
                    <span>
                      Thể loại:{" "}
                      <span
                        style={{ color: "#2489F4", cursor: "pointer" }}
                        onClick={() => searchBrand(product.categoryName)}
                      >
                        {product.categoryName}
                      </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Số lượng: {product.quantity}</span>
                  </td>
                  <td>
                    <span>Đã bán: {product.selled}</span>
                  </td>
                </tr>
              </table>
              Giá:
              <h1 style={{ display: "inline", color: "red" }}>
                {" "}
                {product.productPrice * 1000.0}
              </h1>
              <span style={{ color: "red" }}>VNĐ</span>
            </div>
            <div className="productDetail1">
              <h3>Thông tin chi tiết</h3>
              <table
                className="table1"
                style={{ width: "100%", height: "40vh" }}
              >
                <tr>
                  <td style={{ width: "30%" }}>Mã sản phẩm:</td>
                  <td style={{ width: "70%" }}>{product.productID}</td>
                </tr>
                <tr>
                  <td>Tên sản phẩm</td>
                  <td>{product.productName}</td>
                </tr>
                <tr>
                  <td>Giá sảm phẩm</td>
                  <td>{product.productPrice}</td>
                </tr>
                <tr>
                  <td>Số lượng</td>
                  <td>{product.quantity}</td>
                </tr>
                <tr>
                  <td>Số sp đã bán</td>
                  <td>{product.selled}</td>
                </tr>
                <tr>
                  <td>Loại sản phẩm</td>
                  <td>{product.categoryName}</td>
                </tr>
                <tr>
                  <td>Nhà sản xuất</td>
                  <td>{product.brandName}</td>
                </tr>
              </table>
              <p>
                Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện
                hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ
                giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng
                gói, phí vận chuyển, phụ phí hàng cồng kềnh,...<br></br>
                <span style={{ color: "red" }}>
                  Chính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ
                  thống Nhà sách Fahasa trên toàn quốc
                </span>
              </p>
            </div>
            <div className="productDetail1" style={{marginBottom:'0px'}}>
              <div className="decription pseudo" ref={decriptionRef}>
                <h3>Mô tả sản phẩm</h3>
                Bộ Máy Tính CASIO FX-880BTG - Màu Đen + 2 Bút Bi Pilot BP-1RT -
                Mực Xanh<br></br>
                Máy tính Casio fx-880BTG thuộc dòng máy tính khoa học ClassWiz
                của hãng máy tính CASIO. Máy tính Casio fx-880BTG đã ra đời với
                nhiều cải tiến về: thiết kế - giao diện, tính năng nổi trội và
                độ chính xác cao… để đáp ứng thực tiễn dạy và học tại Việt Nam,
                đồng thời thay đổi tư duy học tập lâu nay của học sinh.<br></br>
                Tính năng nổi bật:<br></br>- QR Code hỗ trợ dạy và học<br></br>-
                Bảng tính spreadsheet<br></br>- Hộp toán học Math Box<br></br>-
                Bảng tuần hoàn<br></br>- Kiểm chứng<br></br>- Gian diện mới với
                thao tác đơn giản hơn<br></br>- Kết quả tính toán chính xác lên
                đến 23 chữ số<br></br>
                Tính năng cơ bản:<br></br>- Kiểm tra số nguyên tố có 4 chữ số
                <br></br>- Lưu phần thương và phần dư trong phép chia<br></br>-
                Tính năng kiểm tra đúng/sai<br></br>- Thông báo vô nghiệm khi
                giải phương trình bậc hai<br></br>- Cực trị của hàm số bậc ba
                <br></br>- Giải phương trình 4 ẩn<br></br>- Giải phương trình
                bậc 4<br></br>- Giải bất phương trình bậc 4<br></br>
                Lưu ý: Được phép mang vào phòng thi từ thời gian tháng 8 năm
                2022
                <br></br>
                ----------------<br></br>
                Bút bi PILOT BP-1RT được nhận xét là "ÊM ÁI VỪA TAY, CẦM LÂU
                KHÔNG MỎI" xuất xứ từ Nhật Bản với thiết kế tối giản, tinh tế,
                sang trọng mang đến cảm giác cầm êm ái trên hành trình viết dài
                của học sinh, sinh viên Việt Nam.<br></br>- Tính năng sản phẩm:
                <br></br>+ Tảm cầm được làm bằng cao su y tế giúp cầm lâu không
                mỏi, mang lại cảm giác êm ái vừa tay<br></br>+ Ngòi bút làm bằng
                chất liệu Vonfram Cacbua siêu bền bỉ với các va chạm thường
                ngày, không lo bể bi, tắc mực, kẹt mực.<br></br>+ Đầu bi 0.7 mm
                viết dễ dàng trên các chất liệu giấy khác nhau<br></br>+ Độ dài
                viết được: 800m
              </div>
              <button onClick={() => clickSeeMore()} className="buttonSeeMore">
                {" "}
                {seeMore ? "Rút gọn" : "Xem thêm"}
              </button>
            </div>
          </div>
        </div>
        <ProductType type={product.categoryName}></ProductType>
        <div className="evaluate">
          <h2 style={{ margin: 0 }}>Đánh giá sản phẩm</h2>
          chuẩn bị phát triển
        </div>
      </div>

      {showTimeShip || showPolicy || wholesale ? (
        <div
          onClick={(e) => (e.currentTarget === e.target ? hideTime() : "")}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "#a5a5a547",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            className="timeship"
            style={{
              width: "35vw",
              padding: "15px",
              fontSize: "15px",
              overflowY: "scroll",
              borderRadius: "10px",
              height: "50vh",
              position: "absolute",
              top: "50vh",
              left: "50vw",
              transform: "translate(-50%,-50%)",
              backgroundColor: "white",
            }}
          >
            <h4
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "3%",
                fontWeight: "600",
              }}
            >
              {showTimeShip ? "Thời gian giao hàng" : ""}
              {wholesale ? "Chính sách khách sỉ" : ""}
              {showPolicy ? "Chính sách đổi trả" : ""}
            </h4>
            <h4
              onClick={() => hideTime()}
              style={{
                opacity: "0.5",
                cursor: "pointer",
                position: "absolute",
                top: "0",
                right: "0",
                margin: "15px",
              }}
            >
              X
            </h4>
            THÔNG TIN ĐÓNG GÓI, VẬN CHUYỂN HÀNG<br></br>
            <br></br>
            Với đa phần đơn hàng, Fahasa.com cần vài giờ làm việc để kiểm tra
            thông tin và đóng gói hàng. Nếu các sản phẩm đều có sẵn hàng,
            Fahasa.com sẽ nhanh chóng bàn giao cho đối tác vận chuyển. Nếu đơn
            hàng có sản phẩm sắp phát hành, Fahasa.com sẽ ưu tiên giao những sản
            phẩm có hàng trước cho Quý khách hàng.<br></br>
            <br></br>
            Trong một số trường hợp, hàng nằm không có sẵn tại kho gần nhất,
            thời gian giao hàng có thể chậm hơn so với dự kiến do điều hàng. Các
            phí vận chuyển phát sinh, Fahasa.com sẽ hỗ trợ hoàn toàn.<br></br>
            <br></br>
            Thời gian giao hàng không tính thứ 7, Chủ nhật, các ngày Lễ, Tết và
            không bao gồm tuyến huyện đảo xa.<br></br>
            <br></br>
            THỜI GIAN VÀ CHI PHÍ GIAO HÀNG TẠI TỪNG KHU VỰC TRONG LÃNH THỔ VIỆT
            NAM:<br></br>
            <br></br>
            1. Nội thành TP.HCM và Hà Nội<br></br>
            <br></br>
            Thời gian: 1-2 ngày<br></br>
            <br></br>
            Chi phí: 20.000 đồng cho 2 kg đầu tiên. Phụ thu 2.000 đồng cho mỗi
            ký tiếp theo<br></br>
            <br></br>
            2. Các tỉnh thành khác<br></br>
            <br></br>
            Thời gian: 2-3 ngày<br></br>
            <br></br>
            Chi phí: 32.000 đồng cho 2 kg đầu tiên. Phụ thu 3.000 đồng cho mỗi
            ký tiếp theo<br></br>
            <br></br>
            Lưu ý: Từ ngày 20/06/2022, Fahsa.com sẽ phụ thu thêm 7.000đ cho đơn
            hàng chứa sản phẩm Tập học sinh (số lượng từ 5 cuốn trở lên) hoặc
            Sách Giáo Khoa, cộng trực tiếp vào chi phí giao hàng thông thường.
          </div>
        </div>
      ) : (
        ""
      )}
      {saddCart !== 0?(
        <div  className="saddCart">
           {saddCart ===1?'Đã add thành công':""}
           {saddCart ===2?'Add thất bại':""}
           {saddCart ===3?'bạn đã add sp này rồi':""}
        </div>
      ):''}
    </div>
  );
};

export default ProductDetail;
