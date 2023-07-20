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
        // Simulated API call to get user-specific posts
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user's posts");
        }
    
        const data = await response.json();
        return data;
      },
}
export default postService