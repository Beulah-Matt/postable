import React, { createContext, useState } from 'react'
import userService from '../services/userService';

const AuthContext = createContext

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const authenticateUser = async (username, password) => {
        try {
          const usersData = await userService.getUsers();
          const authenticatedUser = usersData.find(
            (user) => user.username === username && user.address.zipcode === password
          );
    
          if (authenticatedUser) {
            setUser(authenticatedUser);
          } else {
            setUser(null);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching users:', error);
          setLoading(false);
        }
      };

      const logout = () => {
        setUser(null);
      };

      return(
        <AuthContext.Provider
            value={{
            user,
            loading,
            authenticateUser,
            logout,
        }}
        >
          {children}  
        </AuthContext.Provider>
      )
}

export {AuthContext, AuthProvider}