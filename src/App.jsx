import React, { useEffect } from 'react'
import Navbar from './component/Navbar/Navbar'
import Footer from "./component/Footer/Footer"
import Home from './Pages/Home'
import {Route,Routes } from 'react-router-dom'
import Allbook from './Pages/Allbook'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import Cart from './Pages/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './Store/auth'
import Favourites from './component/Profile/Favourites'
import UserOrderHistory from './component/Profile/UserOrderHistory'
import Setting from './component/Profile/Setting'
import Allorders from './Pages/Allorders'
import Addbook from './Pages/Addbook'
import Updatebook from './Pages/Updatebook'
import Viewbookdetails from './Pages/Viewbookdetails'


const App = () => {
  const dispatch=useDispatch();
  const role =useSelector((state)=>state.auth.role)
  useEffect(()=>{
       if (

             localStorage.getItem("id") &&
             localStorage.getItem("token") &&
             localStorage.getItem("role"))
             {
                     dispatch(authActions.login())
                     dispatch(authActions.changeRole(localStorage.getItem("role")));
       }
  },[])
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<SignUp/>}/>
        <Route path='/all-books' element={<Allbook/>}/>
        <Route path="/profile" element={<Profile />}>
        {role==="user" ?(<Route index element={<Favourites />} />):
        (<Route index element={<Allorders/>} />)}
        {role==="admin" && (
           <Route path="addbook" element={<Addbook/>} />
        )}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="setting" element={<Setting />} />
          </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/viewbookDetails/:id' element={<Viewbookdetails/>}/>
        <Route path='/updateBook/:id' element={<Updatebook/>}/>
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
