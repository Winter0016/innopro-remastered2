import React, { useState, startTransition, Suspense } from 'react';
import { lazy } from 'react';
import { ShopContextProvider } from './context/shopContext';
import { Home } from './Home/Home';
import { Routes, Route } from 'react-router-dom'; // Removed unused import
import { Header } from './Component/Header/Header';
import { Cart } from './Component/shopping/shoppingcart';


const Login = lazy(() => import("./Auth/login/index"));
const Register = lazy(() => import("./Auth/regis/index"));
const Checkout = lazy(() => import('./Component/shopcheckout/shop-checkout'));
const Comment = lazy(() => import('./Component/comment-section/comment'));
const Testing_api = lazy(() => import('./Component/testing api'));

function App() {
  const LoadingIndicator = () => (
    <div>Loading...</div>
  );

  return (
    <ShopContextProvider className="relative">
      <meta name="google-site-verification" content="RAOrR6udlfpJ2cZdeJFUk5-_AqWQI7bdrWg6vC6tSdM" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
      <Header />
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Lazy-load the Login component with Suspense */}
        <Route path="/login" element={<Suspense fallback={<LoadingIndicator />}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<LoadingIndicator />}><Register /></Suspense>} />
        <Route path='/checkout' element={<Suspense fallback={<LoadingIndicator />}><Checkout /></Suspense>} />
        <Route path='/comment' element={<Suspense fallback={<LoadingIndicator />}><Comment /></Suspense>} />
        <Route path="/testing" element={<Suspense fallback={<LoadingIndicator />}><Testing_api /></Suspense>} />
      </Routes>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
    </ShopContextProvider>
  );
}

export default App;
