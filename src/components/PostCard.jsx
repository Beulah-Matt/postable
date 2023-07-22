import React, { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import postService from "../services/postsService";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { AiOutlineLike } from "react-icons/ai";
import PaymentForm from "./PaymentForm";

const PostCard = ({ myPosts }) => {
  const { user, upgradeToPremium, setUser } = useContext(AuthContext);

  const [state, setState] = useState({
    posts: [],
    showPaymentForm: false,
    postLikes: JSON.parse(localStorage.getItem("postLikes")) || {},
    likedPosts: {},
    postComments: {},
    showComments: {},
  });

  const navigate = useNavigate();

  // Memoized fetchPosts function
  const fetchPosts = useMemo(
    () => async () => {
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

        setState((prevState) => ({
          ...prevState,
          posts: postsWithAuthors,
        }));

        // Fetch comments for each post and store them in the state
        fetchCommentsForPosts(postsWithAuthors);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    },
    [myPosts, user]
  );

  // Memoized fetchCommentsForPosts function
  const fetchCommentsForPosts = useMemo(() => async (postsWithAuthors) => {
    const commentsPromises = postsWithAuthors.map((post) =>
      postService.getCommentsForPost(post.id)
    );
    const commentsData = await Promise.all(commentsPromises);

    // Create a mapping of postId to comments
    const commentsByPostId = {};
    commentsData.forEach((comments, index) => {
      commentsByPostId[postsWithAuthors[index].id] = comments;
    });

    setState((prevState) => ({
      ...prevState,
      postComments: commentsByPostId,
    }));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    localStorage.setItem("postLikes", JSON.stringify(state.postLikes));
  }, [state.postLikes]);

  const viewAllClick = () => {
    console.log(user)
    if (user) {
      console.log(user);
      const isSubscribed = user.isPremium; // Check if the user is already subscribed or has made the payment before
      if (isSubscribed) {
        navigate("/allPosts"); // If the user is subscribed, navigate to the "View All" page directly
      } else {
        setState((prevState) => ({
          ...prevState,
          showPaymentForm: true,
        })); // If the user is not subscribed, show the payment form
      }
    }
  };
  const handlePaymentSuccess = (paymentMethodId) => {
    navigate("/allPosts");
    upgradeToPremium();
    // Update the user's premium status and save it in local storage
    setUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, isPremium: true };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("isPremium", true);
        console.log("Premium status:", updatedUser.isPremium);
        return updatedUser;
      }
      return null;
    });
  };

  const handleLikes = (postId) => {
    if (!state.likedPosts[postId]) {
      // If the post has not been liked, update the likes count and mark the post as liked
      setState((prevState) => ({
        ...prevState,
        postLikes: {
          ...prevState.postLikes,
          [postId]: (prevState.postLikes[postId] || 0) + 1,
        },
        likedPosts: {
          ...prevState.likedPosts,
          [postId]: true,
        },
      }));

      // Update localStorage
      localStorage.setItem("postLikes", JSON.stringify(state.postLikes));
    }
  };

  const toggleComments = (postId) => {
    setState((prevState) => ({
      ...prevState,
      showComments: {
        ...prevState.showComments,
        [postId]: !prevState.showComments[postId],
      },
    }));
  };

  return (
    <div>
      <div className="flow-root mt-6">
        <div className="-my-5 divide-y divide-gray-900">
          {state.posts.map((post) => (
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
                  <button
                    className="flex flex-row "
                    onClick={() => handleLikes(post.id)}
                  >
                    {" "}
                    <AiOutlineLike className="h-5 w-5" />{" "}
                    <span className="">{state.postLikes[post.id] || 0} </span>
                  </button>

                  <button
                    className="text-sm text-blue-900 underline focus:outline-none"
                    onClick={() => toggleComments(post.id)}
                  >
                    {state.showComments[post.id]
                      ? "Hide Comments"
                      : "Show Comments"}
                  </button>
                </div>
              </div>
              <div className="mt-3 border border-s-black px-4">
                {state.showComments[post.id] && state.postComments[post.id] && (
                  <div className=" ">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Comments:
                    </h4>
                    <ul className="mt-2 space-y-4">
                      {state.postComments[post.id].map((comment) => (
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
        {user ? (
          <>
            {user.isPremium ? (
              <button
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={viewAllClick}
              >
                View All
              </button>
            ) : (
              <button
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    showPaymentForm: true,
                  }))
                }
              >
                View All (Premium)
              </button>
            )}
            {state.showPaymentForm && (
              <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
            )}
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

