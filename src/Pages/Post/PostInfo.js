import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getCurrentUser, getPosts, language, mainUrl, subjectList } from '../../utils/utils'
import moment from 'moment'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function PostInfo({ post }) {

    const { user } = useSelector(state => state.auth)
    const [postOwner, setPostOwner] = useState({});
    const [subjectObject, setSubjectObject] = useState({});
    const month = ((new Date).getMonth() + 1);

    const getUser = async () => {
        axios.get(`${mainUrl}/api/getUser/${post.OwnerId}`)
            .then((result) => {
                if (result.data.error) {
                    console.log(result.data.message)
                } else {
                    setPostOwner(result.data.user)
                }
            });
    }

    const handleDelete = async () => {
        axios.post(`${mainUrl}/api/deletePost`, { postId: post._id, userId: user.id }).then(result => {
            if (result.data.error) {
                toast.error(result.data.message);
            } else {
                toast.success(result.data.message);
                if (postOwner._id === user.id) {
                    getCurrentUser(user.id)
                    getPosts(user.id);
                }
            }
        });
    }

    useEffect(() => {

        if (post.OwnerId) {
            getUser();
            const subject = subjectList.find(subject => { return subject.value === post.Subject });
            setSubjectObject(subject);
        }

        return () => {
            setPostOwner({});
        }
    }, [post.OwnerId]);


    return (
        <div className='w-100 p-1 border border-secondary rounded d-flex gap-2 align-items-center'>

            <Link to={`/postDetails/${post._id}`} className="w-100 d-flex gap-2 align-items-center text-decoration-none">
                <img className='rounded-circle' src={postOwner.ImageUrl} style={{ width: 36, height: 36 }} />
                <strong className='w-25 text-sm text-secondary'>
                    {language.includes("tr") ? subjectObject.tr : subjectObject.en}
                </strong>
                <strong className='w-50'>
                    {post.Title}
                </strong>
                <div className='w-25'>
                    {
                        post.Month !== month ?
                            post.Date
                            :
                            moment(post.FullDate, "YYYYMMDD, h:mm:ss").fromNow()
                    }
                </div>
            </Link>
            {post.OwnerId === user.id &&
                <div onClick={() => handleDelete()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" style={{ width: 24, height: 24, cursor: 'pointer' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>}
        </div>
    )
}

export default PostInfo