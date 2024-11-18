import React, { Component } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
interface Security{
    token: boolean,
    redirectTo: string,
    
}

export default function PrivateRoute({token, redirectTo}:Security, {children}:any) {
    if(!token){
        return <Navigate to={redirectTo}/>   
    }

    return <>{children ? children : <Outlet/>}</>
}
