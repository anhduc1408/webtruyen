import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(0);
  useEffect(() => {
    async function fetchCart() {
      const response = await axios.post("http://localhost:3001/cart", {
        id: user.id,
      });
      setCart(response.data);
    }
    fetchCart();
  }, []);
  async function changeAmount(e, indexC, id) {
    const check = cart[indexC].amount + e;
    if (check > cart[indexC].quantity - cart[indexC].selled) {
      setError(1);
    }
    else if (check === 0) {
      deleteCart(id,indexC);
    } else {
      const response = await axios.post("http://localhost:3001/changeAmount", {
        e,
        id,
      });
      setCart((cart) =>
        cart.map((item, index) => (index === indexC ? response.data[0] : item))
      );
    }
  }
  async function deleteCart(id,indexC){
    const response =  await axios.post('http://localhost:3001/deleteCart',{id});
    if(response.data === 'success'){
    setCart(prevCart => prevCart.filter((_, index) => index !== indexC));
    }else{
      setError(2);
    }
  }
  function sellNow(){
    navigate('/');
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
        <Navbar status={"Not Sign"}></Navbar>
      </div>
      <div className="contentCart">
        <div className="innerCart">
          <h1>GIỎ HÀNG({cart.length} sản phẩm)</h1>
          {cart.length === 0 ? (
            <div className="emptyDiv">
              <img
                src="	https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"
                alt=""
              ></img>
              <p>Chưa có sản phẩm trong giỏ hàng của bạn.</p>
              <button style={{cursor:'pointer'}} onClick={()=>sellNow()}>MUA SẮM NGAY</button>
            </div>
          ) : (
            <table>
              <tr
                style={{
                  backgroundColor: "white",
                  height: "5vh",
                  borderRadius: "10px",
                  margin: "10px 0",
                }}
              >
                <th style={{ width: "7.5%", textAlign: "center" }}>
                  <input type="checkbox" name="choose" />
                </th>
                <th style={{ width: "55%", textAlign: "start" }}>
                  chọn tất cả({cart.length} sản phẩm)
                </th>
                <th style={{ width: "20%" }}>Số lượng</th>
                <th style={{ width: "20%" }}>Thành tiền</th>
                <th style={{ width: "7.5%", textAlign: "start" }}>xóa</th>
              </tr>
              {cart.map((item, index) => (
                <tr
                  style={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    padding: "5px 0",
                  }}
                >
                  <td style={{ width: "7.5%", textAlign: "center" }}>
                    <input type="checkbox" name="choose" />
                  </td>
                  <td style={{ width: "55%" }}>
                    {" "}
                    <div className="productCart">
                      <img src={item.images} alt=""></img>
                      <div style={{ paddingLeft: "10px" }}>
                        {item.productName}
                        <p style={{ marginBottom: "0", marginTop: "2em" }}>
                          Còn: {item.quantity - item.selled} sản phẩm
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      width: "20%",
                      height: "30%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="quantity">
                      <h2 onClick={() => changeAmount(-1, index, item.cartID)}>
                        {" "}
                        -
                      </h2>
                      {item.amount}
                      <h2 onClick={() => changeAmount(1, index, item.cartID)}>
                        +
                      </h2>
                    </div>
                  </td>
                  <td style={{ width: "20%", textAlign: "center" }}>
                    {item.price}
                  </td>
                  <td style={{ width: "7.5%" }}>
                    <img style={{cursor:'pointer'}} onClick={()=>deleteCart(item.cartID,index)} src="/image.png" alt=""></img>
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
      {error !== 0 ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "#a5a5a547",
            width: "100vw",
            height: "100vh",
          }}
          onClick={(e) => (e.currentTarget === e.target ? setError(0) : "")}
        >
          <div
            className="timeship"
            style={{
              width: "35vw",
              padding: "15px",
              fontSize: "15px",
              borderRadius: "10px",
              height: "50vh",
              position: "absolute",
              top: "50vh",
              left: "50vw",
              transform: "translate(-50%,-50%)",
              backgroundColor: "white",
            }}
          >
            {" "}
            {error === 1?'Hết hàng!':''}{error === 2? 'Không thể xóa':''}{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
