import React, { createContext, useState, useEffect } from "react";
import userService from "../services/userService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if there's a user in local storage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if the user is premium from local storage
    const isPremium = localStorage.getItem("isPremium") === "true";
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, isPremium };
      }
      return null;
    });
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
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
        // Set premium status in local storage
        localStorage.setItem("isPremium", authenticatedUser.isPremium || false);
      } else {
        setUser(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const upgradeToPremium = () => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, isPremium: true };
        // Save the updated premium status to local storage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("isPremium", true);
        return updatedUser;
      }
      return null;
    });
  };

  const logout = () => {
    console.log(user, user.isPremium)
    setUser(null);
    // Remove the user and premium status from local storage upon logout
    localStorage.removeItem("user");
    localStorage.removeItem("isPremium");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        authenticateUser,
        logout,
        upgradeToPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
