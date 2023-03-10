
import { user } from '../store/auth';
import store from '../store/index'
import { setAllPosts } from '../store/allPosts';
import { setMyPosts } from '../store/myPosts';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { setFavoritePosts } from '../store/favoritePosts';
import { setComplaints } from '../store/complaints';

export const clientUrl = "https://forumonline.vercel.app"
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
        value: '1', tr: 'L??tfen Bir Konu Se??iniz...', en: 'Please Select a Subject...'
    }, {
        value: 'Software', tr: 'Yaz??l??m', en: 'Software'
    }, {
        value: 'Hardware', tr: 'Donan??m', en: 'Hardware'
    }, {
        value: 'Games', tr: 'Oyunlar', en: 'Games'
    }, {
        value: 'Shopping', tr: 'Al????veri??', en: 'Shopping'
    }, {
        value: 'Cryptocurrency', tr: 'Kripto Para', en: 'Cryptocurrency'
    }, {
        value: 'CultureArtEducation', tr: 'K??lt??r-Sanat-E??itim', en: 'Culture-Art-Education'
    }, {
        value: 'SportsHealth', tr: 'Spor-Sa??l??k', en: 'Sports-Health'
    }, {
        value: 'SocialMedia', tr: 'Sosyal Medya', en: 'Social Media'
    }, {
        value: 'Help', tr: 'Yard??m', en: 'Help'
    }, {
        value: 'Examine', tr: '??nceleme', en: 'Examine'
    }, {
        value: 'Recommendation', tr: '??neri', en: 'Recommendation'
    }, {
        value: 'Other', tr: 'Di??er', en: 'Other'
    },
];

export const reportTitleList = [
    {
        value: '1', tr: 'L??tfen Bir Ba??l??k Se??iniz...', en: 'Please Select a Title...'
    }, {
        value: 'FalseInformation', tr: 'Yalan Bilgi', en: 'False Information'
    }, {
        value: 'SlangWord', tr: 'Argo S??zc??k', en: 'Slang Word'
    }, {
        value: 'AudienceRouting', tr: 'Kitle Y??nlendirme', en: 'Audience Routing'
    }, {
        value: 'PoliticsTalk', tr: 'Politika Sohbeti', en: 'Politics Talk'
    }, {
        value: 'HateSpeech', tr: 'Nefret S??ylemi', en: 'Hate Speech'
    }, {
        value: 'IrrelevantPost', tr: 'Alakas??z G??nderi', en: 'Irrelevant Post'
    },
];
