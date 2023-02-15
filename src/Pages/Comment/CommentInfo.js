import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { mainUrl } from '../../utils/utils'
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import moment from 'moment';

function CommentInfo({ commentInfo, isDeletedComment, setIsDeletedComment }) {

    const { user } = useSelector(state => state.auth);
    const [commentOwner, setCommentOwner] = useState({});
    const month = ((new Date).getMonth() + 1);

    const getCommentOwner = async () => {
        axios.get(`${mainUrl}/api/getUser/${commentInfo.OwnerId}`)
            .then((result) => {
                if (result.data.error) {
                    console.log(result.data.message)
                } else {
                    setCommentOwner(result.data.user);
                }
            });
    }

    const handleDelete = async () => {
        setIsDeletedComment(true);
        axios.post(`${mainUrl}/api/deleteComment`, { commentId: commentInfo._id, postId: commentInfo.PostId }).then(result => {
            if (result.data.error) {
                toast.error(result.data.message);
                setIsDeletedComment(false);
            } else {
                toast.success(result.data.message);
                setIsDeletedComment(false);
            }
        })
    }

    useEffect(() => {

        getCommentOwner();

        return () => {
            setCommentOwner({});
        }
    }, [commentInfo]);


    if (commentInfo) {
        if (commentOwner) {
            return (
                <div className='w-100 d-flex border rounded'>
                    <div className="card" style={{ width: '15%', height: 'auto' }}>
                        <img src={commentOwner.ImageUrl} className="card-img-top" alt={commentOwner._id} />
                        <h5 className="card-title text-center">{commentOwner.NickName}</h5>
                    </div>

                    <div style={{ width: '85%', height: 'auto' }} className='gap-2 rounded-end p-2'>
                        <div className='w-100'>
                            {commentInfo.Text}
                        </div>
                        <div className='w-100 text-secondary'>
                            {
                                commentInfo.Month !== month ?
                                commentInfo.Date
                                    :
                                    moment(commentInfo.FullDate, "YYYYMMDD, h:mm:ss").fromNow()
                            }
                        </div>
                    </div>
                    {commentInfo.OwnerId === user.id &&
                        (isDeletedComment ?
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div onClick={() => handleDelete()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" style={{ width: 24, height: 24, cursor: 'pointer' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>)
                    }
                </div>
            )
        }
    }
}

export default CommentInfo