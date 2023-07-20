import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { authenticatedUser } = useContext(AuthContext)

    const handleSignIn = async () => {
        await authenticatedUser(username, password)
        console.log("you are authenticated ");
    }

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://tinyurl.com/23uwrvmy')" }}>
        <div class="w-full max-w-xs items-center">
        <form class="bg-slate-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input
                class="shadow appearance-none border border-green-900 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <p class="text-yellow-500 text-xs italic">Please Enter your password.</p>
            </div>
            <div class="flex items-center justify-between">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
