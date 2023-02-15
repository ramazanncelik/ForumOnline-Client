import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { language } from '../../utils/utils';
import Posts from './Posts';

function Search() {

    const { topic } = useParams();
    const { allPosts } = useSelector(state => state.allPosts);
    const [topicPostsList, setTopicPostsList] = useState([]);
    const [allPageCount, setAllPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]);

    const getTopicPosts = async () => {
        const list = [];
        const topicPosts = allPosts.filter((post) => (post.Title.includes(topic) || post.Text.includes(topic) || post.Subject.includes(topic)));
        Object.assign(list, topicPosts);
        list.sort((a, b) => { return (b.Time) - (a.Time) });
        setTopicPostsList(list);
    }

    useEffect(() => {

        if (allPosts) {
            getTopicPosts();
            setAllPageCount(0);
            setCurrentPage(0);
        }

        return () => {
            setTopicPostsList([]);
        }

    }, [topic]);

    useEffect(() => {

        if (topicPostsList.length !== 0) {
            setAllPageCount(Math.ceil(topicPostsList.length / 15));
            setCurrentPage(1);
        }

        return () => {
            setAllPageCount(0);
            setCurrentPage(0);
        }
    }, [topicPostsList]);

    useEffect(() => {

        if (topicPostsList.length !== 0) {
            const indexOfFirst = (currentPage - 1) * 15;
            const indexOfLast = (indexOfFirst + 15);
            setCurrentPosts(topicPostsList.slice(indexOfFirst, indexOfLast));
        }

        return () => {
            setCurrentPosts([]);
        }
    }, [currentPage]);


    if (topicPostsList.length !== 0) {
        return (
            <div className='w-100 d-grid gap-2'>
                <Posts posts={currentPosts} />
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {currentPage === 1 ?
                            null : <li className="page-item"><button onClick={() => setCurrentPage(currentPage - 1)} className='page-link'>Previous</button></li>}
                        {allPageCount > 3 ?
                            <>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                            </>
                            : null}
                        {currentPage === allPageCount ?
                            null : <li className="page-item"><button onClick={() => setCurrentPage(currentPage + 1)} className='page-link'>Next</button></li>}
                    </ul>
                </nav>
            </div>
        )
    } else {
        return (
            <div className='alert alert-warning'>
                {language.includes("tr") ? "Konuyla ilgili gönderi bulunamadı." : "No post found related to the topic."}
            </div>
        )
    }

}

export default Search