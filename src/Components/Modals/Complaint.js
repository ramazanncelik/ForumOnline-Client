import React, { useState } from 'react'
import { language, mainUrl, reportTitleList, getComplaints } from '../../utils/utils'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { reportValidations } from '../../utils/validations'
import moment from 'moment'
import { useSelector } from 'react-redux'

function Complaint({ data }) {

    const { user } = useSelector(state => state.auth);
    const [isPublished, setIsPublished] = useState(false);

    const { handleChange, handleSubmit, handleReset, values, errors, touched } = useFormik({
        initialValues: {
            title: '',
            detail: ''
        },
        onSubmit: values => {
            setIsPublished(true)
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

            axios.post(`${mainUrl}/api/addComplaint`, {
                OwnerId: user.id,
                PostId: data._id,
                Title: values.title,
                Detail: values.detail,
                FullDate: todayy,
                Date: moment().format('lll'),
                Time: time,
                Month: (today.getMonth() + 1),
            }).then((response) => {
                if (response.data.error) {
                    toast.error(response.data.message);
                    setIsPublished(false);
                    handleReset();
                    getComplaints();
                } else {
                    toast.success(response.data.message);
                    setIsPublished(false);
                    handleReset();
                    getComplaints();
                }
            });
        },
        validationSchema: reportValidations
    });

    if (reportTitleList.length !== 0) {
        return (
            <form className='w-75 m-auto mt-2 mb-2' onSubmit={handleSubmit}>

                <div className='w-100 modal-body d-grid gap-2'>

                    <div className='w-100'>
                        <label className='w-100 form-label'>
                            {language.includes("tr") ? "Başlık" : "Title"}
                        </label>
                        <select name='title' className='form-select' defaultValue={values.title} onChange={handleChange}>
                            {reportTitleList.map((report) => {
                                return (
                                    <option key={report.value} value={report.value} defaultChecked={report.value === "1"}>
                                        {language.includes("tr") ? report.tr : report.en}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    {errors.title && touched.title &&
                        <div className="bg-danger text-light p-2 rounded">
                            {errors.title}
                        </div>}

                    <div className='w-100'>
                        <label className='form-label'>
                            {language.includes("tr") ? "Detay" : "Detail"}
                        </label>
                        <div className="form-outline">
                            <textarea name='detail' style={{ minHeight: 200, maxHeight: 200 }} value={values.detail} onChange={handleChange} className="form-control" rows="4" placeholder={language.includes("tr") ? "Detay" : "Detail"}></textarea>
                        </div>
                    </div>
                    {errors.detail && touched.detail &&
                        <div className="bg-danger text-light p-2 rounded">
                            {errors.detail}
                        </div>}

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { handleReset(); }}>
                        {language.includes("tr") ? "Kapat" : "Close"}
                    </button>
                    {isPublished ?
                        <div className='btn btn-secondary'>
                            {language.includes("tr") ? "Yayınlanıyor..." : "Being Published..."}
                        </div>
                        :
                        <button type='submit' className='btn btn-primary'>
                            {language.includes("tr") ? "Yayınla" : "Publish"}
                        </button>}
                </div>
            </form>
        )
    }
}

export default Complaint;