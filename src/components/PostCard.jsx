import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import postService from "../services/postsService"
import { Link, useNavigate } from "react-router-dom"

const PostCard = () => {

  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [signInPrompt, setSignInPromp] = useState(false)

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

  const navigate = useNavigate()

  const viewAllClick = () => {
    if (!user) {
      // Logic to handle prompt for sign-in
      //alert("Please sign in to view all posts");
      navigate('/login')
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
        {/* View All button */}
        <button
          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={viewAllClick}
        >
          View All
        </button>
      </div>
    </div>
  )
}

export default PostCard