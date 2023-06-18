import { User } from "firebase/auth";
import React, { FC, createContext, useState } from "react";

interface AuthContextType {
    user: User | null,
    isLoading: boolean
}
export const AuthContext=createContext<AuthContextType>({
    user: null,
    isLoading:false,
});

interface AuthProviderProps {
    children: React.ReactElement;
}

export const AuthProvider: FC<AuthProviderProps>=({children})=>{
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    
    const value={
        user,
        isLoading
    }
    return <AuthContext.Provider value={value}>
        {
            children
        }
    </AuthContext.Provider>
}