const userService = {
    async getUsers () {
        // Simulated API call to get users
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok){
            throw new Error("Failed to fetch users")
        }

        const data = await response.json()
        return data   
    },

    async authenticateUser(username, password) {
        // Simulated login authentication logic
        const usersData = await this.getUsers();
        const authenticatedUser = usersData.find(
          (user) => user.username === username && user.address.zipcode === password
        );
    
        return authenticatedUser;
      },

      logout() {
        // Simulated logout function
        // Implement page navigation to feed
        return null;
      },
}
export default userService