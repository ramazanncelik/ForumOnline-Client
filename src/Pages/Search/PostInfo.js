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
                <div className='w-100 d-grid'>
                    <strong className='w-100 text-sm text-primary'>
                        {language.includes("tr") ? subjectObject.tr : subjectObject.en}
                    </strong>
                    <div className='w-100 text-sm text-black'>
                        {post.Title}
                    </div>
                    <div className='w-100 text-sm text-secondary'>
                        {(post.Text.length >= 200 &&
                            post.Text.substring(0, 200) + " ...") ||
                            post.Text}
                    </div>
                    <div className='w-100 text-sm text-secondary'>
                        {
                            post.Month !== month ?
                                post.Date
                                :
                                moment(post.FullDate, "YYYYMMDD, h:mm:ss").fromNow()
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PostInfo