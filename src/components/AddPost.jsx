import React, { useState } from "react";
import postService from "../services/postsService";

const AddPost = ({ onAddPostClick, user }) => {
  const [formData, setFormData] = useState({
    userId: user.id,
    title: "",
    body: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        try{
            await postService.addPost(formData)
            onAddPostClick();
        }catch (error){
            console.log('Error:', error)
        }
        
    setFormData({
      userId: "",
      title: "",
      body: "",
    });
  };

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <form className="w-full p-3">
        <div>
          <input
            type="text"
            name="title"
            id="name"
            value={formData.title}
            onChange={handleChange}
            placeholder="Post Title"
            className="appearance-none block italic w-full text-gray-700 border border-gray-200 rounded-xl  px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          <textarea
            name="body"
            id="body"
            placeholder="Write your thoughts"
            value={formData.body}
            onChange={handleChange}
            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            style={{ height: "auto", minHeight: "100px" }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="text-gray-600 text-xs italic flex float-right p-4 bg-gray-100 hover:bg-white rounded-lg px-8"
        >
          Add a Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
