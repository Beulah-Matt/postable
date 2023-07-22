import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import postService from "../services/postsService";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { AiOutlineLike } from "react-icons/ai";
import PaymentForm from "./PaymentForm";

const PostCard = ({ myPosts }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const initialLikesData = JSON.parse(localStorage.getItem("postLikes")) || {};
  const [postLikes, setPostLikes] = useState(initialLikesData);
  const [likedPosts, setLikedPosts] = useState({});
  const [postComments, setPostComments] = useState({});
  const [showComments, setShowComments] = useState({});

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

        // Fetch comments for each post and store them in the state
        const fetchCommentsForPosts = async () => {
          const commentsPromises = postsWithAuthors.map((post) =>
            postService.getCommentsForPost(post.id)
          );
          const commentsData = await Promise.all(commentsPromises);

          // Create a mapping of postId to comments
          const commentsByPostId = {};
          commentsData.forEach((comments, index) => {
            commentsByPostId[postsWithAuthors[index].id] = comments;
          });

          setPostComments(commentsByPostId);
        };

        fetchCommentsForPosts();

      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, [myPosts, user]);

  useEffect(() => {
    setIsSignedIn(user !== null);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("postLikes", JSON.stringify(postLikes));
  }, [postLikes]);

  const navigate = useNavigate();

  const viewAllClick = () => {
    if (isSignedIn) {
      const isSubscribed = false; // Check if the user is already subscribed or has made the payment before
      if (isSubscribed) {
        navigate("/allPosts"); // If the user is subscribed, navigate to the "View All" page directly
      } else {
        setShowPaymentForm(true); // If the user is not subscribed, show the payment form
      }
    }
  };

  const handlePaymentSuccess = (paymentMethodId) => {
    // Process the payment method ID if needed (e.g., send it to the server)
    // Then navigate to the "View All" page
    navigate("/allPosts");
  };

  const handleLikes = (postId) => {
    if (!likedPosts[postId]) {
      // If the post has not been liked, update the likes count and mark the post as liked
      setPostLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: (prevLikes[postId] || 0) + 1,
      }));
      // Mark the post as liked
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [postId]: true,
      }));
    }
  };
  
  const toggleComments = (postId) => {
    setShowComments((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId],
    }));
  };

  return (
    <div>
      <div className="flow-root mt-6">
        <div className="-my-5 divide-y divide-gray-900">
          {posts.map((post) => (
            <div key={post.id} className="py-5">
              <div className="relative">
                <h3 className="text-sm font-semibold text-blue-800">
                  <Link to="#" className="hover:underline focus:outline-none">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {post.body}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Author: {post.author ? post.author.name : "Unknown"}
                </p>
                <div className="flex justify-end mx-6 gap-4">
                  <button className="flex flex-row " onClick={() => handleLikes(post.id)}>
                    {" "}
                    <AiOutlineLike className="h-5 w-5"/> <span className="">{postLikes[post.id] || 0} </span>
                  </button>
    
                   <button
                    className="text-sm text-blue-900 underline focus:outline-none"
                    onClick={() => toggleComments(post.id)}
                    >
                      {showComments[post.id] ? "Hide Comments" : "Show Comments"}
                   </button>
                </div>
              </div>
              <div className="mt-3 border border-s-black px-4">
                {showComments[post.id] && postComments[post.id] && (
                  <div className=" ">
                  <h4 className="text-sm font-semibold text-gray-900">Comments:</h4>
                  <ul className="mt-2 space-y-4">
                    {postComments[post.id].map((comment) => (
                      <li key={comment.id} className="text-sm text-gray-600">
                        <strong>{comment.name}</strong> - {comment.body}
                      </li>
                    ))}
                  </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        {isSignedIn ? (
          <>
            <button
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={viewAllClick}
            >
              View All
            </button>
            {showPaymentForm && <PaymentForm onPaymentSuccess={handlePaymentSuccess} />}
          </>
        ) : (
          <button
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;

