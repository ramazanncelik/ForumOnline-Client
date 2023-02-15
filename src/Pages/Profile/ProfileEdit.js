import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { getCurrentUser, language, mainUrl } from '../../utils/utils'

function ProfileEdit() {

    const { user } = useSelector(state => state.auth);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(user.ImageUrl)
    const [nickName, setNickName] = useState(user.NickName);
    const [name, setName] = useState(user.Name);
    const [gender, setGender] = useState(user.Gender);
    const [biography, setBiography] = useState(user.Biography);
    const [newPassword, setNewPassword] = useState("");
    const [isUpdateImage, setIsUpdateImage] = useState(false)
    const [isUpdateUser, setIsUpdateUser] = useState(false)

    const handleUpdateImage = async () => {
        try {
            setIsUpdateImage(true)
            await axios.post(
                `${mainUrl}/api/updateUserImage`,
                { file: file, userId: user.id },
            ).then((response) => {
                getCurrentUser(user.id)
                setIsUpdateImage(false)
                if (response.data.error) {
                    toast.error(response.data.message)
                } else {
                    toast.success(response.data.message);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            setIsUpdateUser(true)
            await axios.post(
                `${mainUrl}/api/updateProfile`,
                {
                    data: {
                        userId: user.id,
                        nickName: nickName,
                        name: name,
                        gender: gender,
                        biography: biography,
                        password: newPassword
                    }
                },
            ).then((response) => {
                if (response.data.error) {
                    toast.error(response.data.message);
                    getCurrentUser(user.id)
                    setIsUpdateUser(false)
                } else {
                    toast.success(response.data.message);
                    getCurrentUser(user.id)
                    setIsUpdateUser(false)
                }
                setNewPassword("")
            });

        } catch (ex) {
            console.log(ex);
        }
    }

    function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setFile(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    useEffect(() => {

        setImageUrl(user.ImageUrl)
        setNickName(user.NickName)
        setName(user.Name)
        setGender(user.Gender)
        setBiography(user.Biography)

        return () => {
            setImageUrl("")
            setNickName("");
            setName("");
            setGender("");
            setBiography("")
        }

    }, [user])


    if (user) {
        return (
            <div className='w-50 m-auto mb-2 mt-2 border border-secondary p-2 rounded'>
                <div className="w-100 m-auto d-grid gap-2">
                    <img className='w-25 m-auto rounded' src={imageUrl} alt={user.id} />
                    <div className='w-100 m-auto d-flex gap-5 align-content-center'>
                        <input className='w-75' type={"file"} accept='image/*' onChange={e => getBase64(e.currentTarget.files[0])} multiple={false} />
                        {isUpdateImage ?
                            <div className='btn btn-secondary'>
                                {language.includes("tr") ? "Güncelleniyor..." : "Updating..."}
                            </div>
                            :
                            <button disabled={!file} onClick={() => handleUpdateImage()} className={` btn btn-${file ? "primary" : "secondary"}`}>
                                {language.includes("tr") ? "Güncelle" : "Update"}
                            </button>}
                    </div>
                </div>
                <form className='w-100 m-auto d-grid gap-4' onSubmit={handleUpdateProfile}>
                    <div>
                        <label className='form-label'>
                            {language.includes("tr") ? "Kullanıcı Adı" : "Nick Name"}
                        </label>
                        <input value={nickName} onChange={e => setNickName(e.target.value)} className='form-control' type='text' placeholder={language.includes("tr") ? "Kullanıcı Adı" : "Nick Name"} />
                    </div>
                    <div>
                        <label className='form-label'>
                            {language.includes("tr") ? "İsim" : "Name"}
                        </label>
                        <input value={name} onChange={e => setName(e.target.value)} className='form-control' type='text' placeholder={language.includes("tr") ? "İsim" : "Name"} />
                    </div>
                    <div className="form-outline">
                    <label className='form-label'>
                            {language.includes("tr") ? "Biyografi" : "Biography"}
                        </label>
                        <textarea style={{ minHeight: 100, maxHeight: 100 }} value={biography} onChange={e => setBiography(e.target.value)} className="form-control" rows="4" placeholder={language.includes("tr") ? "Biyografi" : "Biography"}></textarea>
                    </div>
                    <div>
                        <label className='form-label'>
                            {language.includes("tr") ? "Cinsiyet" : "Gender"}
                        </label>
                        <div className='d-flex gap-5'>
                            <div className="form-check">
                                <input value={"Man"} onChange={e => setGender(e.target.value)} className="form-check-input" type="radio" name="Gender" id="Man" defaultChecked={user.Gender === "Man" ? true : false} />
                                <label className="form-check-label" htmlFor="Man">
                                    {language.includes("tr") ? "Erkek" : "Man"}
                                </label>
                            </div>
                            <div className="form-check">
                                <input value={"Woman"} onChange={e => setGender(e.target.value)} className="form-check-input" type="radio" name="Gender" id="Woman" defaultChecked={user.Gender === "Woman" ? true : false} />
                                <label className="form-check-label" htmlFor="Woman">
                                    {language.includes("tr") ? "Kadın" : "Woman"}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className='form-label'>
                            {language.includes("tr") ? "Yeni Şifre" : "New Password"}
                        </label>
                        <input value={newPassword} onChange={e => setNewPassword(e.target.value)} className='form-control' type='text' placeholder={language.includes("tr") ? "Yeni Şifre" : "New Password"} />
                    </div>
                    {isUpdateUser ?
                        <div className='w-50 btn btn-secondary'>
                            {language.includes("tr") ? "Güncelleniyor..." : "Updating..."}
                        </div>
                        :
                        <button type='submit' className='w-50 btn btn-primary'>
                            {language.includes("tr") ? "Güncelle" : "Update"}
                        </button>}
                </form>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default ProfileEdit