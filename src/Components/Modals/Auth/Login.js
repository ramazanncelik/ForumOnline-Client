import React, { useEffect, useState } from 'react'
import { getCurrentUser, language, mainUrl, setUserData, setUserInfos } from '../../../utils/utils'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { loginValidations } from '../../../utils/validations';

function Login({ data }) {

    const navigate = useNavigate();
    const [isUser, setIsUser] = useState(false)

    const { handleChange, handleSubmit, handleReset, values, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            axios.post(`${mainUrl}/api/login`, { email: values.email, password: values.password }).then(response => {
                if (response.data.user) {
                    localStorage.setItem('userId', response.data.user._id);
                    getCurrentUser(response.data.user._id);
                    handleReset();
                } else {
                    if (response.data.error) {
                        toast.error(response.data.message);
                        handleReset();
                    } else {
                        toast.error(response.data.message);
                        handleReset();
                    }
                }
            }).catch(error => {
                toast.error(error)
            });
        },
        validationSchema: loginValidations
    });

    useEffect(() => {

        if (localStorage.getItem("userId")) {
            setIsUser(true);
        }

        return () => {
            setIsUser(false)
        }
    }, [localStorage.getItem("userId")])


    return (
        <form className='w-75 m-auto mt-2 mb-2' onSubmit={handleSubmit}>

            <div className='w-100 modal-body d-grid gap-2'>

                <label className='form-label'>E-mail</label>
                <input name='email' value={values.email} onChange={handleChange} type='email' className='w-100 form-control mb-3' placeholder='E-mail' />
                {errors.email && touched.email &&
                    <div class="bg-danger text-light p-2 rounded">
                        {errors.email}
                    </div>}

                <label className='form-label'>Password</label>
                <input name='password' value={values.password} onChange={handleChange} type='password' className='w-100 form-control mb-3' placeholder='Password' />
                {errors.password && touched.password &&
                    <div class="bg-danger text-light p-2 rounded mb-1">
                        {errors.password}
                    </div>}

            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { handleReset(); }}>
                    {language.includes("tr") ? "Kapat" : "Close"}
                </button>

                {
                    !isUser &&
                    <button type='submit' className='btn btn-primary'>
                        {language.includes("tr") ? "Giriş Yap" : "Login"}
                    </button>
                }
            </div>
        </form>
    )
}

export default Login