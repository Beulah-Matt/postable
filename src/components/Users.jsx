import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import NavBar from './NavBar';

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const users = await userService.getUsers();
          setAllUsers(users);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }, []);

  return (
    <div className="border">
    <NavBar />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center mt-6">
      <h1 className="font-bold text-center text-blue-600 text-2xl col-span-full">Who is on Postable</h1>
      {allUsers.map((user, index) => (
        <div key={user.id} className="flex flex-col items-center border border-solid border-gray-400 p-2 mb-2 rounded-md">
          <p className="m-1 text-sm text-gray-900">{user.name}</p>
          <button className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Follow</button>
          {/* If it's the last item in a row, add a spacer div */}
          {index % 3 <= 2 && <div className="hidden md:block col-start-1 col-span-full"></div>}
        </div>
      ))}
    </div>
  </div>
  

  );
};

export default Users;
