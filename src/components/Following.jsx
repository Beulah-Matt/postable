import React from "react";
import NavBar from "./NavBar";
import UserPosts from "./UserPosts";

const Following = ({ followingUsers, userPosts }) => {
  console.log("These users are in the following component", followingUsers);
  return (
    <div>
      <NavBar />
      {followingUsers.map((user) => (
        <div key={user.id}>
          <h2 className="bg-blue-400 text-white justify-start py-2 px-4 rounded-lg shadow-xl mt-4 w-1/2">
            Posts by {user.name}
          </h2>
          <UserPosts userId={user.id} userPosts={userPosts}/>
        </div>
      ))}
    </div>
  );
};

export default Following;
