import React, { useState } from 'react'
import { language, mainUrl } from '../../utils/utils'
import axios from 'axios'
import moment from 'moment';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function ShareComment({ postId,isShared,setIsShared }) {

    const { user } = useSelector(state => state.auth);
    const [commentText, setCommentText] = useState("");

    const handleShareComment = async () => {

        if (commentText !== "") {
            setIsShared(true)
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

            axios.post(`${mainUrl}/api/shareComment`, {
                OwnerId: user.id,
                PostId: postId,
                Text: commentText,
                FullDate: todayy,
                Date: moment().format('lll'),
                Time: time,
                Month: (today.getMonth() + 1),
            }).then((result => {
                if (result.data.error) {
                    setIsShared(false);
                    setCommentText("");
                    toast.error(result.data.message)
                } else {
                    setIsShared(false);
                    setCommentText("");
                    toast.success(result.data.message)
                }
            }));
        }

    }

    return (
        <div className='w-100 m-auto d-flex gap-2'>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} style={{ maxHeight: 50, minHeight: 50 }} className='form-control' placeholder={language.includes("tr") ? "Ne Düşünüyorsun?" : "What Do You Think?"} />
            {isShared ?
                <div onClick={() => handleShareComment()} className='btn btn-secondary'>
                    {language.includes("tr") ? "Paylaşılıyor..." : "Being Shared..."}
                </div>
                :
                <button disabled={commentText === ""} onClick={() => handleShareComment()} className='btn btn-primary'>
                    {language.includes("tr") ? "Paylaş" : "Share"}
                </button>}
        </div>
    )
}

export default ShareComment