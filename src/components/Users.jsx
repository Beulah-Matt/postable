import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

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
      <div className='flex flex-col items-center'>
        {allUsers.map((user) => (
          <div key={user.id} >
            <div className='flex flex-col items-center border border-solid border-gray-400 p-2 mb-2 rounded-md'>
                <p className="m-1 text-sm text-gray-900">{user.name}</p>
                <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Follow</button>
            </div>   
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
