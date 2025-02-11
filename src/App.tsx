import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./HomeSection/components/Navbar/Navbar";
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
import Mendoza from './MainSection/pages/Game/HnMendoza';
import Pasacalle from './MainSection/pages/Game/Pasacalle';
import Yuyashpa from './MainSection/pages/Game/Yuyashpa';
import TriosGarles from './MainSection/pages/Game/TriosGarles';
import Julio from './MainSection/pages/Game/JulioJaramillo';
import AdminUsersPage from './AdminUserPage';

export default function App() {
  const [auth, setAuth] = useState<boolean>(false)
  const [admin, setAdmin] = useState<boolean>(false)
 
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true)
    } else {
      setAuth(false)
    }
    if (localStorage.getItem('role') === "ADMIN") {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [auth])
 
  const handleAuthChallenge = (isAuthenticated: boolean) => {
    setAuth(isAuthenticated)
  }

  function useNavbar() {
    if (auth) return <ArtriNavbar onLogout={() => handleAuthChallenge(false)} />
    else return <Navbar />
  }

  return (
    <BrowserRouter>
      {useNavbar()}
      <Routes>
        {/* Don't need permission */}
        <Route index element={<Home />} />
        <Route path='/artri/home' element={<Home />} />
        <Route path='/artri/info' element={<Information />} />
        <Route path='/artri/contacts' element={<Contacts />} />
        <Route path='/artri/login' element={<Login onLogin={() => handleAuthChallenge(true)} />} />
        <Route path='/artri/register' element={<Register />} />

        {/* Need auth */}
        <Route path='/artri/auth' element={<PrivateRoute token={auth} redirectTo={'/artri/home'} />}>
          <Route path='/artri/auth/home' element={<HomePage />} />
          <Route path='/artri/auth/game' element={<PracticeLevelPage />} />
          <Route path='/artri/auth/game/1' element={<GamePage />} />
          <Route path='/artri/auth/game/2' element={<ChopinGame />} />
          <Route path='/artri/auth/game/3' element={<MozartGame />} />
          <Route path='/artri/auth/game/4' element={<Mendoza />} />
          <Route path='/artri/auth/game/5' element={<Pasacalle />} />
          <Route path='/artri/auth/game/6' element={<Yuyashpa />} />
          <Route path='/artri/auth/game/7' element={<TriosGarles />} />
          <Route path='/artri/auth/game/8' element={<Julio />} />
          <Route path='/artri/auth/statistics' element={<StatisticsPage />} />
        </Route>
        
        {/* Need Role (admin) */}
        <Route path='/artri/auth/admin' element={<PrivateRoute token={auth && admin} redirectTo={'/artri/auth/home'} />}>
          <Route path='/artri/auth/admin/users' element={<AdminUsersPage />} /> {/* Nueva ruta de usuarios */}
        </Route>
      </Routes>      
    </BrowserRouter>
  )
}
