import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useData } from './context/DataContext';
import { DotLoader } from 'react-spinners';

const ProtectedRoute = () => {
    const { isAuthenticated,loading} = useData();

    if(loading) return <DotLoader color="#36d7b7"/>

    if(!loading && !isAuthenticated) return <Navigate to='/' replace/>
    
    return  <Outlet/>
    
}

export default ProtectedRoute
