import React, { useEffect, useState } from 'react'
import { language, mainUrl } from '../../../utils/utils'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerValidations } from '../../../utils/validations'

function Register() {

    const { handleChange, handleSubmit, handleBlur, handleReset, values, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: '',
            nickName: '',
        },
        onSubmit: values => {
            axios.post(`${mainUrl}/api/register`, { email: values.email, password: values.password, nickName: values.nickName }).then(response => {
                if (response.data.error) {
                    toast.error(response.data.message)
                } else {
                    toast.success(response.data.message);
                    handleReset();
                }
            }).catch(error => {
                toast.error(error)
            });
        },
        validationSchema: registerValidations
    });

    return (
        <form className='w-75 m-auto mt-2 mb-2' onSubmit={handleSubmit}>

            <div className='w-100 modal-body d-grid gap-2'>

                <div>
                    <label className='form-label'>E-mail</label>
                    <input name='email' value={values.email} onChange={handleChange} type='email' className='w-100 form-control' placeholder='E-mail' />
                </div>
                {errors.email && touched.email &&
                    <div class="bg-danger text-light p-2 rounded">
                        {errors.email}
                    </div>}

                <div>
                    <label className='form-label'>
                        {language.includes("tr") ? "Şifre" : "Password"}
                    </label>
                    <input name='password' value={values.password} onChange={handleChange} type='password' className='w-100 form-control' placeholder={language.includes("tr") ? "Şifre" : "Password"} />
                </div>
                {errors.password && touched.password &&
                    <div class="bg-danger text-light p-2 rounded">
                        {errors.password}
                    </div>}

                <div>
                    <label className='form-label'>
                        {language.includes("tr") ? "Kullanıcı Adı" : "Nick Name"}
                    </label>
                    <input name='nickName' value={values.nickName} onChange={handleChange} type='text' className='w-100 form-control' placeholder={language.includes("tr") ? "Kullanıcı Adı" : "Nick Name"} />
                </div>
                {errors.nickName && touched.nickName &&
                    <div class="bg-danger text-light p-2 rounded">
                        {errors.nickName}
                    </div>}

            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { handleReset(); }}>
                    {language.includes("tr") ? "Kapat" : "Close"}
                </button>

                <button type='submit' className='btn btn-primary'>
                    {language.includes("tr") ? "Kayıt Ol" : "Register"}
                </button>

            </div>
        </form>
    )
}

export default Register