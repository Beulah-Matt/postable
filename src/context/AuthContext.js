import React, { createContext, useState, useEffect } from 'react'
import userService from '../services/userService';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // Check if there's a user in local storage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

    const authenticateUser = async (username, password) => {
        try {
          const usersData = await userService.getUsers();
          const authenticatedUser = usersData.find(
            (user) => user.username === username && user.address.zipcode === password
          );
    
          if (authenticatedUser) {
            setUser(authenticatedUser);
            // Save the authenticated user to local storage
            localStorage.setItem('user', JSON.stringify(authenticatedUser));
          } else {
            setUser(null);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching users:', error);
          setLoading(false);
        }
      };

      // const followUser = (userId) => {
      //   setUser((prevUser) => ({
      //     ...prevUser,
      //     following: prevUser.following.includes(userId)
      //       ? prevUser.following.filter((id) => id !== userId)
      //       : [...prevUser.following, userId],
      //   }));
      // };

      // const blockUser = (userToBlock) => {
      //   setUser((prevUser) => {
      //     return {
      //       ...prevUser, 
      //       blocked: [...prevUser.blocked, userToBlock]
      //     }
      //   })
      // }

      const upgradeToPremium = () => {
        setUser((prevUser) => ({ ...prevUser, isPremium: true }));
      };

      const logout = () => {
        setUser(null);
        // Remove the user from local storage upon logout
        localStorage.removeItem('user');
      };

      return(
        <AuthContext.Provider
            value={{
            user,
            loading,
            authenticateUser,
            logout,
            // followUser,
            // blockUser,
            upgradeToPremium
        }}
        >
          {children}  
        </AuthContext.Provider>
      )
}

export {AuthContext, AuthProvider}