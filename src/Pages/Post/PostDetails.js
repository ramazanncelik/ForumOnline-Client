import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFavorites, language, mainUrl } from '../../utils/utils';
import axios from 'axios'
import ShareComment from './ShareComment';
import Comments from '../Comment/Comments';
import moment from 'moment';
import toast from 'react-hot-toast';
import Modal from '../../Components/Modal';

function PostDetails() {

    const { user } = useSelector(state => state.auth)
    const { allPosts } = useSelector(state => state.allPosts);
    const { favoritePosts } = useSelector(state => state.favoritePosts);
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState({});
    const [postOwner, setPostOwner] = useState({});
    const [isShared, setIsShared] = useState(false);
    const [isDeletedComment, setIsDeletedComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [isFavorite, setIsFavorite] = useState({});
    const month = ((new Date).getMonth() + 1);

    const getPostInfo = async () => {
        const info = await allPosts.filter(post => post._id === postId);
        setPostInfo(info[0]);
    }

    const getUser = async () => {
        await axios.get(`${mainUrl}/api/getUser/${postInfo.OwnerId}`)
            .then((result) => {
                if (result.data.error) {
                    console.log(result.data.message)
                } else {
                    setPostOwner(result.data.user);
                }
            })
    }

    const getComments = async () => {
        await axios.get(`${mainUrl}/api/getComments/${postId}`).then(result => {
            if (result.data.error) {
                console.log(result.data.message)
            } else {
                setComments(result.data.comments);
            }
        })
    }

    const favoriteControl = async () => {
        const result = favoritePosts.filter(post => { return post.PostId === postId });
        setIsFavorite(result.length === 1 ? result[0] : {});
    }

    const addFavorite = async () => {

        let today = new Date();

        let todayy = today.getFullYear() + '' +
            ((today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1))
                : (today.getMonth() + 1)) + '' + today.getDate() + ", " +
            today.getHours() + ":" +
            ((today.getMinutes()) < 10 ? ("0" + (today.getMinutes()))
                : (today.getMinutes())) + ":" +
            today.getSeconds();

        const time = today.getFullYear() + '' +
            (today.getMonth() < 10 ? ("0" + today.getMonth()) : today.getMonth())
            + "" +
            (today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate())
            + "" +
            (today.getHours() < 10 ? ("0" + today.getHours()) : today.getHours())
            + "" +
            (today.getMinutes() < 10 ? ("0" + today.getMinutes()) : today.getMinutes())
            + "" +
            (today.getSeconds() < 10 ? ("0" + today.getSeconds()) : today.getSeconds())
            + "" +
            (today.getMilliseconds() < 10 ? ("0" + today.getMilliseconds()) : today.getMilliseconds());

        await axios.post(`${mainUrl}/api/addFavorite`, {
            OwnerId: postOwner._id,
            PostId: postId,
            UserId: user.id,
            FullDate: todayy,
            Date: moment().format('lll'),
            Time: time,
            Month: (today.getMonth() + 1),
        }).then(result => {
            if (result.data.error) {
                toast.error(result.data.message);
                getFavorites(user.id);
            } else {
                toast.success(language.includes("tr") ? "Gönderi favorilere eklendi." : "The post has been added to favourites.");
                getFavorites(user.id);
            }
        });
    }

    const deleteFavorite = async () => {
        await axios.delete(`${mainUrl}/api/deleteFavorite/${isFavorite._id}`)
            .then(result => {
                if (result.data.error) {
                    toast.error(result.data.message)
                } else {
                    toast.success(result.data.message);
                    getFavorites(user.id);
                }
            });
    }

    useEffect(() => {

        if (postId) {
            getPostInfo();
            getComments();
        }

        return () => {
            setPostInfo({});
            setComments([]);
        }

    }, []);

    useEffect(() => {

        if (favoritePosts) {
            favoriteControl();
        }

        return () => {
            setIsFavorite({});
        }
    }, [favoritePosts]);


    useEffect(() => {

        if (postId) {
            getPostInfo();
            getComments();
        }

        return () => {
            setPostInfo({});
            setComments([]);
        }
    }, [postId]);

    useEffect(() => {

        if (postInfo) {
            if (postInfo.OwnerId) {
                getUser();
                favoriteControl();
            }
        }

        return () => {
            setPostOwner({});
            setIsFavorite(false);
        }

    }, [postInfo]);

    useEffect(() => {

        if (isShared === false) {
            getComments();
        }

    }, [isShared]);

    useEffect(() => {

        if (isDeletedComment) {
            getComments();
        }

    }, [isDeletedComment]);


    if (postId) {
        if (postInfo) {
            if (postOwner) {
                return (
                    <div className='w-75 h-auto m-auto d-grid gap-2'>
                        <div className='w-100 d-flex position-relative'>

                            <div className="card" style={{ width: '15%', height: 'auto' }}>
                                <img src={postOwner.ImageUrl} className="card-img-top" alt={postOwner._id} />
                                <div className="card-body">
                                    <h5 className="card-title">{postOwner.NickName}</h5>
                                </div>
                            </div>

                            {user &&
                                <div className="position-absolute start-100 dropdown ms-2">
                                    {postOwner._id === user.id &&
                                        (<button onClick={() => { isFavorite._id && deleteFavorite() || addFavorite() }} className="btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite._id && "red" || "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isFavorite._id && "red" || "currentColor"} style={{ width: 24, height: 24 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            </svg>
                                        </button>)
                                        ||
                                        (<div className="dropdown">
                                            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li onClick={() => { isFavorite._id && deleteFavorite() || addFavorite() }} className='d-flex dropdown-item align-items-center btn gap-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite._id && "red" || "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isFavorite._id && "red" || "currentColor"} style={{ width: 24, height: 24 }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                    </svg>

                                                    {isFavorite._id &&
                                                        (language.includes("tr") ? "Favorilerden Kaldır" : "Remove From Favorites")
                                                        ||
                                                        (language.includes("tr") ? "Favorilere Ekle" : "Add To Favorites")
                                                    }
                                                </li>
                                                <li type="button" className='d-flex dropdown-item align-items-center btn gap-2' data-bs-toggle="modal" data-bs-target="#report-modal">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                    </svg>
                                                    {language.includes("tr") ? "Bildir" : "Report"}

                                                </li>
                                            </ul>
                                        </div>)}
                                </div>}
                            <Modal name={"report-modal"} data={postInfo} />
                            <div style={{ width: '85%', height: 'auto' }} className='border border-dark rounded-end p-2 align-items-center'>
                                {postInfo.Files && postInfo.Files.length !== 0 &&
                                    <div id="carouselExampleControls" className="carousel slide w-50 m-auto" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {postInfo.Files.map((file, index) => {
                                                return (
                                                    <div key={file} className={`carousel-item ${index === 0 && "active"}`}>
                                                        <img src={file} className="d-block w-100 rounded" alt={file} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {postInfo.Files.length !== 1 &&
                                            <>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next carousel-caption-color-primary" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </>
                                        }

                                    </div>}
                                <strong className='w-100'>
                                    {postInfo.Title}
                                </strong>
                                <div className='w-100'>
                                    <textarea className='w-100 text-black bg-white border-0' style={{ minHeight: 300, maxHeight: 300 }} disabled={true} value={postInfo.Text} />
                                </div>
                                <div className='w-100 text-secondary'>
                                    {
                                        postInfo.Month !== month ?
                                            postInfo.Date
                                            :
                                            moment(postInfo.FullDate, "YYYYMMDD, h:mm:ss").fromNow()
                                    }
                                </div>
                            </div>
                        </div>
                        {user && <ShareComment postId={postId} isShared={isShared} setIsShared={setIsShared} />}
                        {comments.length !== 0 ?
                            <Comments comments={comments} setComments={setComments} isDeletedComment={isDeletedComment} setIsDeletedComment={setIsDeletedComment} />
                            :
                            <div className="alert alert-primary" role="alert">
                                {language.includes("tr") ? "Bu yazıya henüz yorum yapılmamış." : "There are no comments on this post yet."}
                            </div>
                        }
                    </div>
                )
            }
        }
    }
}

export default PostDetails;