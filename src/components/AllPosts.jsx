import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import postService from "../services/postsService";
import userService from "../services/userService";
import { Link } from 'react-router-dom';

const AllPosts = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            // Fetch all posts
            const allPosts = await postService.getAllPosts();
    
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
      }, [user]);
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
    </div>
    )
}

export default AllPosts