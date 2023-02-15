import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getComplaints, language, mainUrl, reportTitleList } from '../../utils/utils';
import { toast } from 'react-hot-toast';

function ComplaintInfo({ complaintInfo, index }) {

    const [titleObject, setTitleObject] = useState({});
    const [isDeletedPost, setIsDeletedPost] = useState(false);
    const [isDeletedComplaint, setIsDeletedComplaint] = useState(false);

    const handleDeletePost = async () => {
        setIsDeletedPost(true);
        axios.post(`${mainUrl}/api/deleteComplaint`, {
            userId: complaintInfo.OwnerId,
            postId: complaintInfo.PostId,
            complaintId: complaintInfo._id
        }).then(result => {
            if (result.data.error) {
                toast.error(result.data.message);
                setIsDeletedPost(false);
                getComplaints();
            } else {
                toast.success(result.data.message);
                setIsDeletedPost(false);
                getComplaints();
            }
        });
    }

    const handleDeleteComplaint = async () => {
        setIsDeletedComplaint(true);
        axios.post(`${mainUrl}/api/deleteComplaint`, {
            complaintId: complaintInfo._id
        }).then(result => {
            if (result.data.error) {
                toast.error(result.data.message);
                setIsDeletedComplaint(false);
                getComplaints();
            } else {
                toast.success(result.data.message);
                setIsDeletedComplaint(false);
                getComplaints();
            }
        });
    }

    useEffect(() => {

        const title = reportTitleList.find(title => { return title.value === complaintInfo.Title });
        setTitleObject(title);

        return () => {
            setTitleObject({});
        }
    }, [complaintInfo]);


    return (
        <div className='w-100 d-grid gap-2 border-bottom py-1'>
            <div className='d-flex w-100'>
                <strong className='w-25 px-2'>{index + 1}</strong>
                <span className='w-25 px-2'>{language.includes("tr") ? titleObject.tr : titleObject.en}</span>
                <span className='w-50 px-2'>{complaintInfo.Detail}</span>
            </div>
            <div className='w-75'>
                <span className='d-flex gap-2'>
                    <Link to={`/postDetails/${complaintInfo.PostId}`} className='btn btn-info'>
                        {language.includes("tr") ? "İncele" : "Examine"}
                    </Link>

                    {isDeletedPost ?
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <button className='btn btn-danger' onClick={() => handleDeletePost()}>
                            {language.includes("tr") ? "Gönderiyi Sil" : "Delete Post"}
                        </button>}
                    {isDeletedComplaint ?
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <button className='btn btn-warning' onClick={() => handleDeleteComplaint()}>
                            {language.includes("tr") ? "Şikayeti Sil" : "Delete Complaint"}
                        </button>}
                </span>
            </div>
        </div>
    )
}

export default ComplaintInfo