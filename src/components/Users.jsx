import React, { useEffect } from 'react';

import NavBar from './NavBar';

const Users = ({allUsers ,followingUsers ,handleFollowButtonClick}) => {

  useEffect(() => {
    localStorage.setItem('followingUsers', JSON.stringify(followingUsers));
  }, [followingUsers]);
  

  return (
    <div className="border">
    <NavBar />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center mt-6">
      <h1 className="font-bold text-center text-blue-600 text-2xl col-span-full">Who is on Postable</h1>
      {allUsers.map((user, index) => (
        <div key={user.id} className="flex flex-col items-center border border-solid border-gray-400 p-2 mb-2 rounded-md">
          <p className="m-1 text-sm text-gray-900">{user.name}</p>
          <button className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => handleFollowButtonClick(user.id)}
          >{/* Conditionally render the button text */}
          {followingUsers.some((followingUser) => followingUser.id === user.id)
            ? "Unfollow"
            : "Follow"}
          </button>
        </div>
      ))}
    </div>
  </div>
  

  );
};

export default Users;
