import React from 'react';
import { Link } from 'react-router-dom'; 

// use this component to show the posts by a particular user when I click following 

const UserPosts = ({ userId, userPosts }) => {
  if (!userPosts || userPosts.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flow-root mt-6 ">
        <ul className="-my-5 divide-y divide-gray-900">
          {userPosts.map((post) => (
            <li key={post.id} className="py-5">
              <div className="relative">
                <h3 className="text-sm font-semibold text-blue-800">
                    {post.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.body}</p>
                <p className="mt-1 text-sm text-gray-600">
                  Author: {post.author ? post.author.name : "Unknown"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPosts;

