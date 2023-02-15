import React, { useState } from 'react'
import { getCurrentUser, language, mainUrl, subjectList } from '../../utils/utils'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { publishPostValidations } from '../../utils/validations'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PublishPost() {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const [isPublished, setIsPublished] = useState(false);
    const [files, setFiles] = useState([]);

    const { handleChange, handleSubmit, handleReset, values, errors, touched } = useFormik({
        initialValues: {
            subject: '',
            title: '',
            text: '',
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

            axios.post(`${mainUrl}/api/publishPost`, {
                OwnerId: user.id,
                Subject: values.subject,
                Title: values.title,
                Text: values.text,
                Files: files,
                Comment: 0,
                FullDate: todayy,
                Date: moment().format('lll'),
                Time: time,
                Month: (today.getMonth() + 1),
            }).then((response) => {
                if (response.data.error) {
                    toast.error(response.data.message);
                    getCurrentUser(user.id)
                    setIsPublished(false);
                    handleReset();
                    navigate('/profile', { replace: true })
                } else {
                    toast.success(response.data.message);
                    getCurrentUser(user.id)
                    setIsPublished(false);
                    handleReset();
                    navigate('/profile', { replace: true })
                }
            });
        },
        validationSchema: publishPostValidations
    });

    const getBase64 = async (files) => {
        const list = [];
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = function () {
                list.push(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        setFiles(list)
    }

    if (subjectList.length !== 0) {
        return (
            <form className='w-50 m-auto mt-2 d-grid gap-2' onSubmit={handleSubmit}>
                <div className='w-100 d-grid gap-2'>
                    {language.includes("tr") ? "Konu" : "Subject"}
                    <select name='subject' className='form-select' defaultValue={values.subject} onChange={handleChange}>
                        {subjectList.map((subject) => {
                            return (
                                <option key={subject.value} value={subject.value} defaultChecked={subject.value === "1"}>
                                    {language.includes("tr") ? subject.tr : subject.en}
                                </option>
                            )
                        })}
                    </select>
                </div>
                {errors.subject && touched.subject &&
                    <div className="bg-danger text-light p-2 rounded">
                        {errors.subject}
                    </div>}

                <div className='w-100'>
                    <label className='form-label'>
                        {language.includes("tr") ? "Başlık" : "Title"}
                    </label>
                    <input name='title' value={values.title} onChange={handleChange} type='text' className='w-100 form-control' placeholder={language.includes("tr") ? "Başlık" : "Title"} />
                </div>
                {errors.title && touched.title &&
                    <div className="bg-danger text-light p-2 rounded">
                        {errors.title}
                    </div>}

                <div className='w-100'>
                    <label className='form-label'>
                        {language.includes("tr") ? "Metin" : "Text"}
                    </label>
                    <div className="form-outline">
                        <textarea name='text' style={{ minHeight: 200, maxHeight: 200 }} value={values.text} onChange={handleChange} className="form-control" rows="4" placeholder={language.includes("tr") ? "Metin" : "Text"}></textarea>
                    </div>
                </div>
                {errors.text && touched.text &&
                    <div className="bg-danger text-light p-2 rounded">
                        {errors.text}
                    </div>}

                <div className='w-100 mt-2 mb-2'>
                    <input className='w-100 form-control form-control-sm' type={"file"} accept='image/*' onChange={e => getBase64(e.currentTarget.files)} multiple />
                </div>

                {isPublished ?
                    <div className='btn btn-secondary w-100'>
                        {language.includes("tr") ? "Yayınlanıyor..." : "Being Published..."}
                    </div>
                    :
                    <button type='submit' className='btn btn-primary w-100'>
                        {language.includes("tr") ? "Yayınla" : "Publish"}
                    </button>}
            </form>
        )
    }
}

export default PublishPost