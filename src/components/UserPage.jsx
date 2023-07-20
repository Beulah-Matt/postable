import React from 'react'
import PostCard from './PostCard'
import NavBar from './NavBar'

const UserPage = () => {
  return (
    <>
        <NavBar />
        <h2 className='mt-4 font-semibold'>My Posts</h2>
        <PostCard myPosts={true} />
    </>
  )
}

export default UserPage