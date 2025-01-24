import { Route, Routes } from 'react-router-dom';
import React from "react";
import Home from '../Home/Home'
import ToDoListPage from '../ToDoListPage/Tolistpage';

function Routers() {
    return (
     
      <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/todo" element={<ToDoListPage/>} />  
    </Routes>
      
    );
  }
  
  export default Routers;
  