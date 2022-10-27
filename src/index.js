import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import Navbartop from './component/Navbar';
import Display from './component/Display';
import DisplayB from './component/DisplayB'
import Antrian from './component/panggilan/Antrian';
import AntrianB from './component/panggilan/AntrianB';
import AntrianC from './component/panggilan/AntrianC';
import AntrianD from './component/panggilan/AntrianD';
// import Footer from './component/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Navbartop/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Display/>} />
        <Route path='displayb' element={<DisplayB/>} />
        <Route path='panggilan' element={<Antrian/>} />
        <Route path='panggilan-b' element={<AntrianB/>} />
        <Route path='panggilan-c' element={<AntrianC/>} />
        <Route path='panggilan-d' element={<AntrianD/>} />
      </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
