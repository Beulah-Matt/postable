import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import postService from '../services/postsService';

// use this component to show the posts by a particular user when I click following 

const UserPosts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Fetch posts for the specified user (userId)
    const fetchUserPosts = async () => {
      try {
        const userPostData = await postService.getMyPosts(userId);
        setUserPosts(userPostData);
      } catch (error) {
        console.error(`Error fetching posts for user with ID ${userId}`, error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  // Check if userPosts is available before rendering
  if (!userPosts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {userPosts.map((post) => (
            <li key={post.id} className="py-5">
              <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                <h3 className="text-sm font-semibold text-blue-800">
                  <Link to="#" className="hover:underline focus:outline-none">
                    {/* Extend touch target to the entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </Link>
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

