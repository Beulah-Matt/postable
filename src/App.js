import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Feed, Login, Users, Profile, AllPosts, MyPosts, Following, PaymentForm, UserPosts } from './components/index';
import userService from './services/userService';
import postService from './services/postsService';
import { AuthContext } from './context/AuthContext';

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
      console.log('User posts fetched:', userPostData);
      setUserPosts(userPostData);
    } catch (error) {
      console.error(`Error fetching posts for user with ID ${userId}`, error);
    }
  };

  // Fetch all users when the app loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userService.getUsers();
        setAllUsers(users);
        setFollowingUsers([]); // Reset followingUsers to an empty array when a new user logs in
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [user]);

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
        <Route path="/myPage" element={ <MyPosts />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/allPosts' element={ <AllPosts />}/>
        <Route path='/users' element={<Users allUsers={allUsers} followingUsers={followingUsers} handleFollowButtonClick={handleFollowButtonClick} />} />
        <Route path='/following' element={<Following followingUsers={followingUsers} userPosts={userPosts}  />} />
        <Route path="/payment" element={PaymentForm} />
        {/* Route to display individual user posts */}
        <Route path="/users/:userId" element={<UserPosts userPosts={userPosts} />} />
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
