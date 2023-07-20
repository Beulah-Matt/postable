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
    }
}
export default postService