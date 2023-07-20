import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import postService from "../services/postsService"
import { Link, useNavigate } from "react-router-dom"

const PostCard = () => {

  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [signInPrompt, setSignInPromp] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await postService.getPosts();

        // Associate the posts with their corresponding authors
        const postsWithAuthors = await Promise.all(
          allPosts.map(async (post) => {
            const author = await postService.getAuthor(post.userId);
            return { ...post, author };
          })
        );

        setPosts(postsWithAuthors);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);

  const navigate = useNavigate()

  const viewAllClick = () => {
    if (!user) {
      navigate('/login')
    } else {
      // Logic to navigate to all posts page when user is signed in
      // Implement page navigation here
    }
  };

  return (
    <div>
      <div className="flow-root mt-6 p-2">
        <ul className="-my-5 divide-y divide-slate-700">
          {posts.map((post) => (
            <li key={post.id} className="py-5">
              <div className="relative ">
                <h3 className="text-sm font-semibold text-blue-800">
                  <Link className="hover:underline focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.body}</p>
                <p className="mt-1 text-sm text-cyan-950">Author: {post.author ? post.author.name : "Unknown"}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        {/* View All button */}
        <button
          className="w-full flex justify-center items-center px-4 py-2 mt-4 border border-slate-700 shadow-sm text-sm font-medium rounded-md text-gray-700 bg- hover:bg-gray-50"
          onClick={viewAllClick}
        >
          View All
        </button>
      </div>
    </div>
  )
}

export default PostCard