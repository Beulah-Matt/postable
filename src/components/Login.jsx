import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const { authenticateUser } = useContext(AuthContext)
    const { authenticateUser, user, upgradeToPremium } = useContext(AuthContext);

    // const handleSignIn = async () => {
    //     await authenticateUser(username, password)
    //     navigate('/myPage')
    // }

    const handleSignIn = async () => {
        try {
          await authenticateUser(username, password);
          // Check if the user is authenticated and prompt for premium membership payment
          if (user) {
            if (user.isPremium) {
              alert("You are already a premium member. Enjoy unlimited access!");
            } else {
              const payForPremium = window.confirm(
                "Pay for premium membership and view all posts?"
              );
              if (payForPremium) {
                upgradeToPremium(); // Call the function to upgrade the user to premium
              }
            }
          } else {
            alert("Invalid username or password. Please try again.");
          }
          navigate("/myPage");
        } catch (error) {
          console.error("Error signing in:", error);
        }
      };
      

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://tinyurl.com/23uwrvmy')" }}>
        <div className="w-full max-w-xs items-center">
        <form className="bg-slate-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                Username
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input
                className="shadow appearance-none border border-green-900 rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <p className="text-yellow-500 text-xs italic">Please Enter your password.</p>
            </div>
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignIn}
            >
                Sign In
            </button>
            </div>
        </form>
        </div>
    </div>    
  );
};

export default Login;
