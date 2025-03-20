'use client'

import { AuthContext, AuthContextType as JwtAuthContextType } from './jwt-context';
import { useContext } from 'react';


type AuthContextType =
    //   | AmplifyAuthContextType
    //   | Auth0AuthContextType
    //   | FirebaseAuthContextType
    //   | 
    JwtAuthContextType;

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;