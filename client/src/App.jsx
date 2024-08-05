import React, { useState } from 'react'
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Sign_up from './components/Sign_up';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Lists from './components/Lists';
import Errorpage from './components/Errorpage';
import NewList from './components/NewList';
import Newtask from './components/Newtask';
import { itemsContext } from "./Store/Store";

export default function App() {

  const [Listname, setListname] = useState()

  return (
    <itemsContext.Provider value={{setListname,Listname}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Sign_up />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/Lists' element={<Lists />}></Route>
          <Route path='/Errorpage' element={<Errorpage />}></Route>
          <Route path='/newlist' element={<NewList />}></Route>
          <Route path='/newtask' element={<Newtask/>}></Route>
        </Routes>
      </BrowserRouter>
    </itemsContext.Provider>
  )

}
