const userService = {
    async getUsers () {
        // Simulated API call to get users
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok){
            throw new Error("Failed to fetch users")
        }

        const data = await response.json()
        return data   
    }
}
export default userService