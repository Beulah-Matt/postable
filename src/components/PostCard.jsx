import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import postService from "../services/postsService"

const PostCard = () => {

  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    const fetchPosts = async () => {
      try {
        const allPosts = await postService.getPosts(user)
        setPosts(allPosts)
      }catch(error){
        console.error('Error fetching posts', error)
      }
    }
    fetchPosts();
  }, [user])

  return (
    <div>
      <div className="flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id} className="py-5">
              <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                <h3 className="text-sm font-semibold text-blue-800">
                  <a href="#" className="hover:underline focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <a
          href="#"
          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          View all
        </a>
      </div>
    </div>
  )
}

export default PostCard