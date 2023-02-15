import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import ResetPassword from './Pages/Auth/ResetPassword/ResetPassword'

import Home from './Pages/Home/Home'
import { getComplaints, getCurrentUser, getFavorites, getPosts } from './utils/utils'
import Profile from './Pages/Profile/Profile'
import ProfileEdit from './Pages/Profile/ProfileEdit'
import PublishPost from './Pages/PublishPost/PublishPost'
import { useSelector } from 'react-redux'
import PostDetails from './Pages/Post/PostDetails'
import Complaints from './Pages/Complaint/Complaints'
import Search from './Pages/Search/Search'

function App() {

  const { user } = useSelector(state => state.auth);

  useEffect(() => {

    const userId = localStorage.getItem("userId");
    if (userId) {
      getCurrentUser(userId);
      getPosts(userId);
      getFavorites(userId);
    }

  }, []);


  useEffect(() => {

    if (user) {
      getPosts(user.id);
    }

  }, [user.Post]);

  useEffect(() => {

    if (user) {
      getComplaints();
    }

  }, [user]);

  useEffect(() => {

    const userId = localStorage.getItem('userId');
    if(userId){
      getCurrentUser(userId);
      getPosts(userId);
      getFavorites(userId);
    }else{
      getPosts("userId");
    }
    
  }, [localStorage.getItem('userId')]);

  return (
    <>
      <Toaster position='top-center' />
      <Navbar />
      <div className='w-100 mt-2 p-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/resetpassword/:userEmail' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profileEdit' element={<ProfileEdit />} />
          <Route path='/publishPost' element={<PublishPost />} />
          <Route path='/postDetails/:postId' element={<PostDetails />} />
          <Route path='/complaints' element={<Complaints />} />
          <Route path='/search/:topic' element={<Search />} />
        </Routes>
      </div>
    </>
  )
}

export default App