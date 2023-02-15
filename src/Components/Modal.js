import React from 'react'
import { language } from '../utils/utils'
import PublishPost from './Modals/PublishPost'
import Complaint from './Modals/Complaint'
import Login from './Modals/Auth/Login'
import GetEmail from './Modals/Auth/ResetPassword/GetEmail'
import Register from './Modals/Auth/Register'

function Modal({ name, data }) {
    return (
        <div className="modal fade" id={name} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            {name === "login-modal" &&
                                (language.includes("tr") ? "Giriş Yap" : "Login") ||
                                name === "register-modal" &&
                                (language.includes("tr") ? "Kayıt Ol" : "Register") ||
                                name === "reset-password-modal" &&
                                (language.includes("tr") ? "Şifre Sıfırla" : "Reset Password") ||
                                name === "report-modal" &&
                                (language.includes("tr") ? "Bildir" : "Report") ||
                                name === "publish-post-modal" &&
                                (language.includes("tr") ? "Gönderi Paylaş" : "Publish Post")}
                        </h5>
                    </div>
                    {
                        name === "report-modal" &&
                        <Complaint data={data} />
                        ||
                        name === "publish-post-modal" &&
                        <PublishPost /> ||
                        name === "login-modal" &&
                        <Login /> ||
                        name === "reset-password-modal" &&
                        <GetEmail /> ||
                        name === "register-modal" &&
                        <Register />
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal