const postService = {
    async getPosts (user) {
        // Simulated API call to get posts
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!response.ok){
            throw new Error("Failed to fetch posts")
        }

        const data = await response.json()
        
        // If user is not logged in, return only 20 posts
        return user ? data : data.slice(0, 20);
    },

    async getAllPosts (){
      // Simulated API call to get posts
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if(!response.ok){
          throw new Error("Failed to fetch posts")
      }

      const allPostData = await response.json()
      return allPostData
    },
    
    async getAuthor(userId) {
        // Simulated API call to get user based on userId
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
    
        const data = await response.json();
        return data;
      },

      async getMyPosts(userId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user's posts");
          }
      
          const postData = await response.json();
      
          // Fetch the author information for each post
          const postsWithAuthors = await Promise.all(postData.map(async (post) => {
            const author = await this.getAuthor(post.userId);
            return { ...post, author }; // Include the author object in the post data
          }));
      
          return postsWithAuthors;
        } catch (error) {
          console.error("Error fetching user's posts", error);
          throw error;
        }
      },

      async getCommentsForPost(postId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
          if (!response.ok) {
            throw new Error("Failed to fetch comments");
          }
    
          const commentsData = await response.json();
          return commentsData;
        } catch (error) {
          console.error("Error fetching comments", error);
          throw error;
        }
      }
      
}
export default postService