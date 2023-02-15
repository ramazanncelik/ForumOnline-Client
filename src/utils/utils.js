
import { user } from '../store/auth';
import store from '../store/index'
import { setAllPosts } from '../store/allPosts';
import { setMyPosts } from '../store/myPosts';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { setFavoritePosts } from '../store/favoritePosts';
import { setComplaints } from '../store/complaints';

export const clientUrl = "https://forumonline.adaptable.app"
export const mainUrl = "https://forumonlinebackend.adaptable.app"
export const defaultUserImageUrl = "https://firebasestorage.googleapis.com/v0/b/eidos-95e1f.appspot.com/o/Uploads%2FUsers%2Fuserdefault.png?alt=media&token=06397d82-3dc8-4783-b110-a22b5d68e92e";
export const language = navigator.language;

export const getCurrentUser = (userId) => {
    axios.get(`${mainUrl}/api/getUser/${userId}`).then((result) => {
        if (result.data.error) {
            toast.error(result.data.message);
        } else {
            setUserData(result.data.user)
        }
    });
}

export const setUserData = (infos) => {
    store.dispatch(user({
        id: infos._id,
        Email: infos.Email,
        NickName: infos.NickName,
        Name: infos.Name,
        Biography: infos.Biography,
        Post: infos.Post,
        ImageUrl: infos.ImageUrl,
        EmailVerify: infos.EmailVerify,
        Gender: infos.Gender,
        Role: infos.Role,
    }));
}

export const getPosts = (userId) => {
    axios.get(`${mainUrl}/api/getPosts`).then((result) => {
        if (result.data.error) {
            toast.error(result.data.message);
        } else {
            if (userId !== "userId") {
                const myPosts = result.data.posts.filter(post => post.OwnerId === userId);
                setCurrentUserPosts(myPosts);
                setPosts(result.data.posts);
            } else {
                setPosts(result.data.posts);
            }
        }
    });
}

export const setPosts = (posts) => {
    store.dispatch(setAllPosts(posts.reduce((posts, post) => [...posts, { ...post }], [])));
}

export const setCurrentUserPosts = (myPosts) => {
    store.dispatch(setMyPosts(myPosts.reduce((myPosts, myPost) => [...myPosts, { ...myPost }], [])));
}

export const getFavorites = async (userId) => {
    await axios.get(`${mainUrl}/api/getFavorites/${userId}`).then(result => {
        if (result.data.error) {
            toast.error(result.data.message);
        } else {
            setCurrentUserFavoritePosts(result.data.favorites);
        }
    });
}

export const setCurrentUserFavoritePosts = (myFavoritePosts) => {
    store.dispatch(setFavoritePosts(myFavoritePosts.reduce((myFavoritePosts, myFavoritePost) => [...myFavoritePosts, { ...myFavoritePost }], [])))
}

export const getComplaints = async () => {
    await axios.get(`${mainUrl}/api/getComplaints`).then(result => {
        if (result.data.error) {
            toast.error(result.data.message);
        } else {
            setAllComplaints(result.data.complaints);
        }
    });
}

export const setAllComplaints = (complaints) => {
    store.dispatch(setComplaints(complaints.reduce((complaints, complaint) => [...complaints, { ...complaint }], [])))
}

export const subjectList = [
    {
        value: '1', tr: 'Lütfen Bir Konu Seçiniz...', en: 'Please Select a Subject...'
    }, {
        value: 'Software', tr: 'Yazılım', en: 'Software'
    }, {
        value: 'Hardware', tr: 'Donanım', en: 'Hardware'
    }, {
        value: 'Games', tr: 'Oyunlar', en: 'Games'
    }, {
        value: 'Shopping', tr: 'Alışveriş', en: 'Shopping'
    }, {
        value: 'Cryptocurrency', tr: 'Kripto Para', en: 'Cryptocurrency'
    }, {
        value: 'CultureArtEducation', tr: 'Kültür-Sanat-Eğitim', en: 'Culture-Art-Education'
    }, {
        value: 'SportsHealth', tr: 'Spor-Sağlık', en: 'Sports-Health'
    }, {
        value: 'SocialMedia', tr: 'Sosyal Medya', en: 'Social Media'
    }, {
        value: 'Help', tr: 'Yardım', en: 'Help'
    }, {
        value: 'Examine', tr: 'İnceleme', en: 'Examine'
    }, {
        value: 'Recommendation', tr: 'Öneri', en: 'Recommendation'
    }, {
        value: 'Other', tr: 'Diğer', en: 'Other'
    },
];

export const reportTitleList = [
    {
        value: '1', tr: 'Lütfen Bir Başlık Seçiniz...', en: 'Please Select a Title...'
    }, {
        value: 'FalseInformation', tr: 'Yalan Bilgi', en: 'False Information'
    }, {
        value: 'SlangWord', tr: 'Argo Sözcük', en: 'Slang Word'
    }, {
        value: 'AudienceRouting', tr: 'Kitle Yönlendirme', en: 'Audience Routing'
    }, {
        value: 'PoliticsTalk', tr: 'Politika Sohbeti', en: 'Politics Talk'
    }, {
        value: 'HateSpeech', tr: 'Nefret Söylemi', en: 'Hate Speech'
    }, {
        value: 'IrrelevantPost', tr: 'Alakasız Gönderi', en: 'Irrelevant Post'
    },
];