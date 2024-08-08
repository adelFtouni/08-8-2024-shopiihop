import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/home';
import Butler from './pages/butler/butler';
import Search from './pages/search/Search';
import Orders from './pages/orders/Orders';
import MyAccount from './pages/account/MyAccount';
import Stores from './pages/stores/Stores';
import StoreDetails from './pages/storeDetails/StoreDetails';
import ItemDetails from './pages/itemDetails/ItemDetails';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import PlacedOrder from './pages/placedorder/PlacedOrder';
import Signup from './components/signup';
import Login from './components/login/index';
import CartProvider from './context/cartContext';
import Nav from '../src/components/nav/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/app.scss';
import GoogleMap from './pages/home/Map';

function Layout({ children }) {
  return (
    <div className='body'>
      <div className="main-content">{children}</div>
      <Navbar />
    </div>
  );
}

function App() {
 // const isAuthenticated = localStorage.getItem('token') !== null;
// console.log(isAuthenticated)
//console.log((localStorage.getItem('user_info').token))
const isAuthenticated = localStorage.getItem('user_info') !== null;

// Parse the JSON string to convert it into a JavaScript object
const data = JSON.parse(isAuthenticated);

// Access the token property from the object
const token = data.token;

// Log the token
console.log(token);

const apiKey = 'AIzaSyDtMvhSyV3P2LQ9bqEYs1KnqRVxYPC9L-4';
  return (
    <CartProvider>
      <Layout>
      
      <Routes>
 
  <Route path="/" element={<Home />} />
  <Route path="/search" element={<Search />} />
  <Route path="/butler" element={<Butler />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/account" element={<MyAccount />} />
  <Route path="/stores" element={<Stores />} />
  <Route path="/store" element={<StoreDetails />} />
  <Route path="/item" element={<ItemDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/placedorder" element={<PlacedOrder />} />
  <Route path="/account/signup" element={<Signup />} />
  <Route path="/account/login" element={<Login />} />
  <Route path="/map" element={<GoogleMap key={apiKey}/>} />
</Routes>

      </Layout>
    </CartProvider>
  );
}

export default App;
