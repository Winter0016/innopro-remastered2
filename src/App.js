import React from 'react';
import { ShopContextProvider } from './context/shopContext';
import { Header } from './Component/Header/Header';
import { Login } from './Auth/login/index';
import { Register } from './Auth/regis/index';
import { Home } from './Home/Home';
import { Cart } from './Component/shopping/shoppingcart';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Checkout } from './Component/shopcheckout/shop-checkout';
import { Comment } from './Component/comment-section/comment';
import { Testing_api } from './Component/testing api';
function App() {
  const location = useLocation();
  const excludedpath = ['/comment'];

  const iscartvisible = !excludedpath.includes(location.pathname);
  return (
    <ShopContextProvider className="relative">
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"  rel="stylesheet" />
        </head>
        <Header />
        <Cart/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/comment' element={<Comment/>}></Route>
          <Route path="/testing" element={<Testing_api/>}></Route>
        </Routes>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
    </ShopContextProvider>
  );
}

export default App;
