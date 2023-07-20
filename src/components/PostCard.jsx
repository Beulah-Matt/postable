import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import postService from "../services/postsService";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";

const PostCard = ({ myPosts }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let allPosts;
        if (myPosts && user) {
          allPosts = await postService.getMyPosts(user.id);
        } else {
          allPosts = await postService.getPosts();
        }

        // Fetch all users
        const users = await userService.getUsers();

        // Map each post to include the corresponding author
        const postsWithAuthors = allPosts.map((post) => {
          const author = users.find((user) => user.id === post.userId);
          return { ...post, author };
        });

        setPosts(postsWithAuthors);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, [myPosts, user]);

  const navigate = useNavigate();

  const viewAllClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      // Logic to navigate to all posts page when user is signed in
      // Implement page navigation here
    }
  };

  return (
    <div>
      <div className="flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id} className="py-5">
              <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                <h3 className="text-sm font-semibold text-blue-800">
                  <Link to="#" className="hover:underline focus:outline-none">
                    {/* Extend touch target to entire panel */}
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
      <div className="mt-6">
        {/* View All button */}
        {!myPosts && (
          <button
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={viewAllClick}
          >
            View All
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
