import React from 'react';
import { ShopContextProvider } from './context/shopContext';
import { Header } from './Component/Header/Header';
import { Login } from './Auth/login/index';
import { Register } from './Auth/regis/index';
import { Home } from './Home/Home';
import { Cart } from './Component/shopping/shoppingcart';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/shopContext';
import { Checkout } from './Component/shopcheckout/shop-checkout';
import { Comment } from './Component/comment-section/comment';
function App() {
  const location = useLocation();
  const excludedpath = ['/comment'];

  const iscartvisible = !excludedpath.includes(location.pathname);
  return (
    <ShopContextProvider className="relative">
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"  rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"/>
        </head>
        <Header />
        {iscartvisible && <Cart/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/comment' element={<Comment/>}></Route>
        </Routes>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
    </ShopContextProvider>
  );
}

export default App;
