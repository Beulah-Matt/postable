import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import postService from "../services/postsService";
import { useNavigate } from "react-router-dom";


const Profile = () => {

  const {user} =  useContext(AuthContext)
  const [userPosts, setUserPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserPosts = async () => {
      try{
        const userPostData = await postService.getMyPosts(user.id)
        setUserPosts(userPostData)
      }catch(error){
        console.error("Error fetching user's posts", error);
      }
    }
    fetchUserPosts()
  },[user])

  return (
    <div className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="border-b-2 font-medium border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
      Hello, {user && user.name}
      </div>
      <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        <h5 className="mb-2 text-l leading-tight text-neutral-800 dark:text-neutral-50">
        You have authored {userPosts.length} Posts
        </h5>
      </div>
      <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Following
        </p>
      </div>
      <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
      <button
          type="button"
          className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={() => navigate("/allPosts")}
        >
          All Posts
        </button>
      </div>   
    </div>
  );
};

export default Profile;
