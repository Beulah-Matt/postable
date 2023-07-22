import React, { useState } from 'react';
import PostCard from './PostCard';
import NavBar from './NavBar';
import { IoMdAdd } from 'react-icons/io';
import AddPost from './AddPost';

const MyPosts = ({user}) => {
  const [showAddPost, setShowAddPost] = useState(false);

  const handleBtnClick = () => {
    setShowAddPost(!showAddPost);
  };

  const handleAddPostClick = () => {
    setShowAddPost(false); // Minimize the AddPost component
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-row justify-between mt-3 px-4'>
        <h2 className='font-semibold'>My Posts</h2>
        <IoMdAdd onClick={handleBtnClick} className='w-10 h-10' />
      </div>
            
      {showAddPost && <AddPost onAddPostClick={handleAddPostClick} user={user} />}
      <PostCard myPosts={true} />
    </>
  );
};

export default MyPosts;
