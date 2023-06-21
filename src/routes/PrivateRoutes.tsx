import React, { FC } from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface PrivateRoutesProps{
    children:React.ReactElement
}
const PrivateRoutes: FC<PrivateRoutesProps> = ({children}) => {
    const {user}=useAuth()
    if(!user){
        return <Navigate to="/signup" replace={true}/>;
    }

    return children;
}

export default PrivateRoutes