import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Feed, Login, Users, Profile, AllPosts, MyPosts, Following, PaymentForm, UserPosts } from './components/index';
import userService from './services/userService';
import postService from './services/postsService';
import { AuthContext } from './context/AuthContext';

import ErrorComponent from './components/ErrorComponent';

function App() {
  const [allUsers, setAllUsers] = useState([]); // State to store all users
  const [followingUsers, setFollowingUsers] = useState(() => {
    const savedFollowingUsers = localStorage.getItem('followingUsers');
    return savedFollowingUsers ? JSON.parse(savedFollowingUsers) : [];
  });
  const [userPosts, setUserPosts] = useState([]);
  const {user} = useContext(AuthContext)

  // Function to fetch user posts for the given userId
  const fetchUserPosts = async (userId) => {
    try {
      const userPostData = await postService.getMyPosts(userId);
      setUserPosts(userPostData);
    } catch (error) {
      console.error(`Error fetching posts for user with ID ${userId}`, error);
    }
  };

  // Fetch all users when the app loads
  useEffect(() => {
    const fetchUsersAndProfileImages = async () => {
      try {
        const users = await userService.getUsers();

        // Fetch profile images for all users
        const usersWithImages = await Promise.all(
          users.map(async (user) => {
            const profileImage = await fetchRandomProfileImage();
            return {
              ...user,
              profileImage,
            };
          })
        );

        setAllUsers(usersWithImages);
      } catch (error) {
        console.error('Error fetching users and profile images:', error);
      }
    };

    fetchUsersAndProfileImages();
  }, []);

  const fetchRandomProfileImage = async () => {
    // Fetch a single random profile image
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0].picture.large;
  };

  //Function to handle follow/unfollow button click
  const handleFollowButtonClick = async (userId) => {
    const userToFollow = allUsers.find((user) => user.id === userId);
    if (!followingUsers.find((user) => user.id === userId)) {
      setFollowingUsers(prevFollowingUsers => [...prevFollowingUsers, userToFollow]);
    } else {
      setFollowingUsers(prevFollowingUsers => prevFollowingUsers.filter((user) => user.id !== userId));
    }
  };
  
    useEffect(() => { // Update localStorage when followingUsers state changes
      localStorage.setItem('followingUsers', JSON.stringify(followingUsers));
    }, [followingUsers]);
  
    useEffect(() => { // Fetch user posts when followingUsers state changes or when the app loads
      if (followingUsers.length > 0 && user) {
        followingUsers.forEach((user) => {
          fetchUserPosts(user.id);
        });
      }
    }, [followingUsers, user]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <Root followingUsers={followingUsers} onFollowButtonClick={handleFollowButtonClick} />}>
        <Route index element={<Feed />} />
        <Route path="/login" element={ <Login />} />
        {user ? ( // Check if the user is authenticated
          <>
            <Route path="/myPage" element={<MyPosts user={user} />} />
            <Route path="/profile" element={<Profile followingUsers={followingUsers} />} />
            <Route path="/allPosts" element={<AllPosts />} />
            <Route
              path="/users"
              element={<Users allUsers={allUsers} followingUsers={followingUsers} handleFollowButtonClick={handleFollowButtonClick} />}
            />
            <Route path="/following" element={<Following followingUsers={followingUsers} userPosts={userPosts} />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/users/:userId" element={<UserPosts userPosts={userPosts} />} />
          </>
        ) : (
          // Render the error page if the user is not authenticated
          <Route path="*" element={<ErrorComponent />} />
        )}
        
      </Route>
    )
  );

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 bg-blue-100">    
      <RouterProvider router={router} />
    </div>
  );
}

const Root = ({ allUsers, followingUsers, onFollowButtonClick }) => {
  return (
    <div>
      {/* Pass the allUsers, followingUsers, and onFollowButtonClick as props to Outlet */}
      <Outlet allUsers={allUsers} followingUsers={followingUsers} onFollowButtonClick={onFollowButtonClick} className="flex-grow" />
    </div>
  );
}

export default App;
