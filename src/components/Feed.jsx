import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import postService from '../services/postsService'

const Feed = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try{
          const postData = await postService.getPosts()
          setPosts(postData)  
        }catch (error){
            console.log('Error fetching posts', error)
        }
    }

  return (
    <div>
        <PostCard posts={posts}/>
    </div>
  )
}

export default Feed