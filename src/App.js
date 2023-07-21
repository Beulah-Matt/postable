import React, { useContext } from 'react';
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Feed from "./components/Feed";
import Login from "./components/Login"
import Users from './components/Users';
import Profile from './components/Profile';
import AllPosts from './components/AllPosts'
import MyPosts from './components/MyPosts';
import Following from './components/Following';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <Root />}>
        <Route index element={<Feed />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/myPage" element={ <MyPosts />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/allPosts' element={ <AllPosts />}/>
        <Route path='/users' element={<Users />} />
        <Route path='/following' element={<Following />} />
      </Route>
    )
  )
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 bg-blue-100">    
      <RouterProvider router={router}/>
    </div>
  );
}

const Root = () => {
  return(
    <div>
      <Outlet className="flex-grow" />
    </div>
  )
}

export default App;
