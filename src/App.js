import React from 'react';
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Feed from "./components/Feed";
import Login from "./components/Login"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={ <Root />}>
        <Route index element={<Feed />} />
        <Route path="/login" element={ <Login />} />
      </Route>
    )
  )
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">    
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
