import React, { useEffect } from 'react'
import { clientUrl, getCurrentUser, language, mainUrl } from '../../../../utils/utils'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { getEmailValidations } from '../../../../utils/validations';

function GetEmail() {

    const navigate = useNavigate();

    const { handleChange, handleSubmit, handleReset, values, errors, touched } = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            axios.post(`${mainUrl}/api/getEmail`, {
                userEmail: values.email,
                subject: language.includes("tr") ?
                    "ForumOnline Şifre Sıfırlama" : "ForumOnline Password Reset",
                text: language.includes("tr") ?
                    "Şifrenizi değiştirmek için lütfen aşağıdaki linke tıklayınız." : "Please click the link below to change your password.",
                html: `<a href=${`${clientUrl}/resetpassword/${values.email}`}>${`${clientUrl}/resetpassword/${values.email}`}</a>`,
                emailType: "resetPassword"
            }).then(result => {
                if (result.data.error) {
                    toast.error(result.data.message);
                } else {
                    toast.success(result.data.message);
                    handleReset();
                }
            });
        },
        validationSchema: getEmailValidations
    });

    useEffect(() => {

        if (localStorage.getItem('userId')) {
            navigate('/', { replace: true });
        }

    }, []);

    return (
        <form className='w-75 m-auto mt-2 mb-2' onSubmit={handleSubmit}>

            <div className='w-100 modal-body d-grid gap-2'>

                <label className='form-label'>E-mail</label>
                <input name='email' value={values.email} onChange={handleChange} type='email' className='w-100 form-control mb-3' placeholder='E-mail' />
                {errors.email && touched.email &&
                    <div class="bg-danger text-light p-2 rounded">
                        {errors.email}
                    </div>}

            </div>

            <div className="modal-footer d-flex">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { handleReset(); }}>
                    {language.includes("tr") ? "Kapat" : "Close"}
                </button>

                <button type='submit' className='btn btn-primary'>
                    {language.includes("tr") ? "Email Al" : "Get Email"}
                </button>
            </div>
        </form>
    )
}

export default GetEmail;