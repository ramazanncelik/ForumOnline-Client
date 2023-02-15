import React, { useEffect } from 'react'
import { language, mainUrl } from '../../../utils/utils'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik'
import { resetPasswordValidations } from '../../../utils/validations';

function ResetPassword() {

  const { userEmail } = useParams();
  const navigate = useNavigate();

  const { handleChange, handleSubmit, handleReset, values, errors, touched } = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    onSubmit: values => {
      axios.post(`${mainUrl}/api/resetPassword`, {
        userEmail: userEmail,
        newPassword: values.password
      }).then(result => {
        if (result.data.error) {
          toast.error(result.data.message);
        } else {
          toast.success(result.data.message);
          handleReset();
          navigate('/login', { replace: true });
        }
      });
    },
    validationSchema: resetPasswordValidations
  });

  useEffect(() => {

    if (localStorage.getItem('userId')) {
      navigate('/', { replace: true });
    }

  }, []);

  return (
    <form className='w-50 m-auto mt-5' onSubmit={handleSubmit}>
      <label className='form-label'>New Password</label>
      <input name='password' value={values.password} onChange={handleChange} type='password' className='w-100 form-control mb-3' placeholder='New Password' />
      {errors.password && touched.password &&
        <div className="bg-danger text-light p-2 rounded">
          {errors.password}
        </div>}

      <label className='form-label'>New Password Confirm</label>
      <input name='passwordConfirm' value={values.passwordConfirm} onChange={handleChange} type='password' className='w-100 form-control mb-3' placeholder='New Password Confirm' />
      {errors.passwordConfirm && touched.passwordConfirm &&
        <div className="bg-danger text-light p-2 rounded mb-2">
          {errors.passwordConfirm}
        </div>}

      <button type='submit' className='btn btn-primary w-100'>
        {language.includes("tr") ? "Şifreyi Güncelle" : "Update Password"}
      </button>
    </form>
  )
}

export default ResetPassword