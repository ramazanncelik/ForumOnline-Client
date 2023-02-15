import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser, language } from '../../utils/utils';
import PostInfo from '../Post/PostInfo';
import FavoriteInfo from './FavoriteInfo'

function Profile() {

  const { user } = useSelector(state => state.auth);
  const { myPosts } = useSelector(state => state.myPosts);
  const { favoritePosts } = useSelector(state => state.favoritePosts);
  const [userInfos, setuserInfos] = useState({});
  const [myPostsList, setMyPostsList] = useState([]);
  const [myFavoritePostsList, setMyFavoritePostsList] = useState([]);
  const [postOrFavorite, setpostOrFavorite] = useState("post")

  const getPosts = async () => {
    const list = [];
    Object.assign(list, myPosts);
    list.sort((a, b) => { return (b.Time) - (a.Time) });
    setMyPostsList(list)
  }

  useEffect(() => {

    getPosts();

    return () => {
      setMyPostsList([]);
    }

  }, [myPosts]);

  useEffect(() => {

    setMyFavoritePostsList(favoritePosts)

    return () => {
      setMyFavoritePostsList([]);
    }

  }, [favoritePosts]);

  useEffect(() => {

    const userId = localStorage.getItem('userId');
    if (userId) {
      getCurrentUser(userId)
    }

  }, [localStorage.getItem('userId')]);

  useEffect(() => {

    setuserInfos(user)

    return () => {
      setuserInfos({})
    }

  }, [user])

  if (user) {
    return (
      <div className='w-100 h-100 m-auto d-grid gap-2'>
        <div className='w-75 h-auto m-auto d-flex gap-2 border border-secondary rounded align-items-center'>
          <img style={{ maxWidth: '15%' }} className='rounded-start m-auto' src={userInfos.ImageUrl} alt={user.id} />
          <div className='d-grid gap-2' style={{ width: '85%' }}>
            <div className='w-100'>
              <strong>Email: </strong>{userInfos.Email}
            </div>
            <div className='w-100'>
              <strong>{language.includes("tr") ? "Kullanıcı Adım: " : "My Nick Name: "}</strong>{userInfos.NickName}
            </div>
            {userInfos.Name !== "" &&
              <div className='w-100'>
                <strong>{language.includes("tr") ? "Adım: " : "My Name: "}</strong>{userInfos.Name}
              </div>
            }
            {userInfos.Biography !== "" &&
              <div className='w-100'>
                <strong>{language.includes("tr") ? "Biyografi: " : "My Biography: "}</strong>{userInfos.Biography}
              </div>}
            <div className='w-100'>
              <strong>{language.includes("tr") ? "Yazılarım: " : "My Posts: "}</strong>{userInfos.Post}
            </div>
          </div>
        </div>

        <div className='w-100 d-flex gap-4 align-items-center justify-content-center'>
          <svg onClick={() => setpostOrFavorite("post")} xmlns="http://www.w3.org/2000/svg" fill={postOrFavorite === "post" ? "aqua" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='cursor-pointer' style={{ width: 36, height: 36 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          <svg onClick={() => setpostOrFavorite("favorite")} xmlns="http://www.w3.org/2000/svg" fill={postOrFavorite === "favorite" ? "red" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={postOrFavorite === "favorite" ? "red" : "currentColor"} style={{ width: 36, height: 36 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        {console.log(myFavoritePostsList)}
        {postOrFavorite === "post" &&
          (myPostsList.length === 0 ?
            <div className='w-75 alert alert-danger m-auto'>
              {language.includes("tr") ? "Henüz Bir Yazı Yayınlamadınız." : "You Haven't Published Any Post Yet."}
            </div>
            :
            <div className='w-75 h-auto m-auto d-grid gap-2'>
              {myPostsList.map(post => {
                return (
                  <PostInfo key={post._id} post={post} />
                )
              })}
            </div>)
          ||
          (myFavoritePostsList.length === 0 ?
            <div className='w-75 alert alert-danger m-auto'>
              {language.includes("tr") ? "Henüz favorilerinize eklediğiniz bir gönderi yok." : "There are no posts you have added to your favorites yet."}
            </div>
            :
            <div className='w-75 h-auto m-auto d-grid gap-2'>
              {myFavoritePostsList.map(favorite => {
                return (
                  <FavoriteInfo key={favorite._id} favorite={favorite} />
                )
              })}
            </div>)}
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default Profile