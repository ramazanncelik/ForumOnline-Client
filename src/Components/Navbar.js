import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/auth';
import { getCurrentUser, getPosts, language, mainUrl } from '../utils/utils';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from './Modal';

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [userInfos, setUserInfos] = useState(user);
  const [topic, setTopic] = useState("");

  const SignOut = async () => {
    dispatch(logout());
    localStorage.removeItem('userId');
  }

  const getEmail = async () => {
    axios.post(`${mainUrl}/api/getEmail`, {
      userEmail: user.Email,
      subject: language.includes("tr") ?
        "ForumOnline E-posta adresi Onaylama" : "ForumOnline Email address Confirmation",
      text: language.includes("tr") ?
        "Mail adresinizi onaylamak için lütfen aşağıdaki linke tıklayınız." : "Please click the link below to confirm your e-mail address.",
      html: `<a href=${`${mainUrl}/api/updateEmailVerify/${user.id}`}>${`${mainUrl}/api/updateEmailVerify/${user.id}`}</a>`,
      emailType: "emailConfirmation"
    }).then(result => {
      if (result.data.error) {
        if (result.data.message !== "Email Onaylama Zaten Yapılmış") {
          toast.error(result.data.message);
        } else {
          toast.error(result.data.message);
          getCurrentUser(user.id)
        }
      } else {
        toast.success(result.data.message);
      }
    });
  }

  const handleSearch = async e => {
    e.preventDefault();
    navigate(`/search/${topic}`, { replace: true });
  }

  useEffect(() => {

    const userId = localStorage.getItem('userId');
    if (userId) {
      getCurrentUser(userId);
    }

  }, [localStorage.getItem('userId')]);

  useEffect(() => {

    setUserInfos(user)

    return () => {
      setUserInfos({})
    }

  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand">ForumOnline</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon navbar-toggler-primary"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {localStorage.getItem('userId') ?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link d-flex gap-2" to={`/`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  {language.includes("tr") ? "Ev" : "Home"}
                </NavLink>
              </li>

              {user.Role === "Admin" &&
                <li className="nav-item">
                  <NavLink className="nav-link d-flex gap-2" to={"/complaints"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {language.includes("tr") ? "Şikayetler" : "Complaints"}
                  </NavLink>
                </li>}

              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle text-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className='rounded-circle me-2' width="24" height="24" src={userInfos.ImageUrl} />
                  {language.includes("tr") ? "Profil" : "Profile"}
                </div>
                <ul className="dropdown-menu p-1 gap-1">
                  <li><NavLink className="dropdown-item rounded d-flex gap-2" to={`/profile`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {language.includes("tr") ? "Profil" : "Profile"}
                  </NavLink></li>
                  <li><NavLink className="dropdown-item rounded d-flex gap-2" to={`/profileEdit`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                    {language.includes("tr") ? "Profili Düzenle" : "Edit Profile"}
                  </NavLink></li>
                  <li type="button" className="dropdown-item rounded d-flex gap-2" data-bs-toggle="modal" data-bs-target="#publish-post-modal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    {language.includes("tr") ? "Gönderi Yayınla" : "Post Publish"}
                  </li>

                  {!userInfos.EmailVerify &&
                    <li><button onClick={() => { getEmail() }} className="dropdown-item rounded d-flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {language.includes("tr") ? "Email Onayla" : "Confirm Email"}
                    </button></li>}
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link onClick={() => SignOut()} className="dropdown-item rounded d-flex gap-2" to={`/`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    {language.includes("tr") ? "Çıkış Yap" : "Sign Out"}
                  </Link></li>
                </ul>
              </li>
            </ul>
            :
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link d-flex gap-2" to={`/`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  {language.includes("tr") ? "Ev" : "Home"}
                </NavLink>
              </li>
              <li type="button" className="nav-item" data-bs-toggle="modal" data-bs-target="#login-modal">
                <button className="nav-link btn">{language.includes("tr") ? "Giriş Yap" : "Login"}</button>
              </li>
              <li type="button" className="nav-item" data-bs-toggle="modal" data-bs-target="#register-modal">
                <button className="nav-link btn">{language.includes("tr") ? "Kayıt Ol" : "Register"}</button>
              </li>
              <li type="button" className="nav-item" data-bs-toggle="modal" data-bs-target="#reset-password-modal">
                <button className="nav-link btn">{language.includes("tr") ? "Şifre Sıfırla" : "Reset Password"}</button>
              </li>
            </ul>}

          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder={language.includes("tr") ? "Konu Ara" : "Search For Topics"} aria-label="Search" value={topic} onChange={e => setTopic(e.target.value)} />
            <button disabled={topic === "" ? true : false} className="btn btn-outline-success" type="submit">
              {language.includes("tr") ? "Ara" : "Search"}
            </button>
          </form>
        </div>
      </div>
      <Modal name={"publish-post-modal"} />
      <Modal name={"login-modal"} />
      <Modal name={"register-modal"} />
      <Modal name={"reset-password-modal"} />
    </nav>
  )
}

export default Navbar