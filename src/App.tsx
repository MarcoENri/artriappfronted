import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Navbar} from "./HomeSection/components/Navbar/Navbar";
import Contacts from './HomeSection/pages/Contacts/Contacts';
import Home from "./HomeSection/pages/Home/Home";
import Information from './HomeSection/pages/Information/Information';
import PrivateRoute from './HomeSection/pages/Login/components/PrivateRoute';
import Login from "./HomeSection/pages/Login/Login";
import Register from "./HomeSection/pages/Register/Register";
import ArtriNavbar from './MainSection/components/Navbar/ArtriNavbar';
import ChopinGame from './MainSection/pages/Game/ChopinGame';
import GamePage from './MainSection/pages/Game/GamePage';
import MozartGame from './MainSection/pages/Game/MozartGame';
import HomePage from './MainSection/pages/Home/HomePage';
import PracticeLevelPage from './MainSection/pages/PracticeLevel/PracticeLevelPage';
import AdminStatisticsPage from './MainSection/pages/Statistics/AdminStatistics';
import StatisticsPage from './MainSection/pages/Statistics/StatisticsPage';
import { MemberCRUD } from './MainSection/service/Member/MemberCRUD';



export default function App() {
  const [auth, setAuth] = useState<boolean>(false)
  const [admin, setAdmin] = useState<boolean>(false)
 
  useEffect(() => {
    if (localStorage.getItem('token')){
      setAuth(true)
    } else {
      setAuth(false)
    }
    if (localStorage.getItem('role') == "ADMIN"){
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  },[auth])
 
  const handleAuthChallenge = (isAuthenticated:boolean) =>{
      setAuth(isAuthenticated)
  }

  function useNavbar(){
    if(auth) return <ArtriNavbar onLogout={()=>handleAuthChallenge(false)}/>
    else return <Navbar />
  }


  

  return (
    <BrowserRouter>
    {useNavbar()}
    <Routes>
    {/* Don't need permmision */}
    <Route index element={<Home />}/>
    <Route path='/artri/home' element={<Home/>}/>
    <Route path='/artri/info' element={<Information />} />
    <Route path='/artri/contacts' element={<Contacts />} />
    <Route path='/artri/login' element={<Login onLogin ={()=>handleAuthChallenge(true)}/>}/>
    <Route path='/artri/register' element={<Register/>}/>
    {/*Need auth */}
    <Route path='/artri/auth' element={<PrivateRoute token={auth} redirectTo={'/artri/home'}/>}>
      <Route path='/artri/auth/home'element={<HomePage/>}/>
      <Route path='/artri/auth/game'element={<PracticeLevelPage/>}/>
      <Route path='/artri/auth/game/1'element={<GamePage/>}/>
      <Route path='/artri/auth/game/2'element={<ChopinGame/>}/>
      <Route path='/artri/auth/game/3'element={<MozartGame/>}/>
      <Route path='/artri/auth/statistics'element={<StatisticsPage/>}/>
    </Route>
    
    {/* Need Rol */}
    <Route path='/artri/auth/admin' element={<PrivateRoute token={auth && admin} redirectTo={'/artri/auth/home'} />}>
      <Route path='/artri/auth/admin/stats' element={<AdminStatisticsPage />}/>
    </Route>


    {/* <Route path='/artri/admin/crud' element={<MemberCRUD />} /> */}

    
    </Routes>      
    </BrowserRouter>
  )
}

