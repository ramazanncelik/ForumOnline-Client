import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getCurrentUser, getPosts, language, mainUrl, subjectList } from '../../utils/utils'
import moment from 'moment'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function PostInfo({ post, index }) {

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
        <tr>
            <th scope="row">
                <Link to={`/postDetails/${post._id}`} className="w-100 d-flex gap-2 align-items-center text-decoration-none text-black">
                    {index + 1}
                </Link>
            </th>
            <td className='d-flex gap-2 align-items-center'>
                <Link to={`/postDetails/${post._id}`} className="w-100 d-flex gap-2 align-items-center text-decoration-none text-black">
                    <img className='rounded-circle' src={postOwner.ImageUrl} style={{ width: 36, height: 36 }} />
                    <strong className='w-75 text-sm text-secondary'>
                        {language.includes("tr") ? subjectObject.tr : subjectObject.en}
                    </strong>
                </Link>
            </td>
            <td>
                <Link to={`/postDetails/${post._id}`} className="w-100 h-100 d-flex gap-2 align-items-center text-decoration-none text-black" style={{ minHeight: 36 }}>
                    
                        {post.Title}
                   
                </Link>
            </td>
            <td>
                <Link to={`/postDetails/${post._id}`} className="w-100 h-100 d-flex gap-2 align-items-center text-decoration-none text-secondary" style={{ minHeight: 36 }}>
                    {
                        post.Month !== month ?
                            post.Date
                            :
                            moment(post.FullDate, "YYYYMMDD, h:mm:ss").fromNow()
                    }
                </Link>
            </td>

        </tr>
    )
}

export default PostInfo