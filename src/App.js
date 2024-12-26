
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import './App.css';
import Home from './Router/Home/Home'
import Signed from './Router/Signed/Signed'
import ProductManager from './Router/ProductManager/ProductManager'
import Search from './Router/Search/Search'
import Cart from './Router/Cart/Cart'
import ProductDetail from './Router/productDetail/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/Signed/:id' element={<Signed/>} />
        <Route path='/product' element={<ProductManager/>} />
        <Route path='/Search' element={<Search/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/ProductDetail/:id' element={<ProductDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
