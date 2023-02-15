import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { language, subjectList } from '../../utils/utils';
import Posts from './Posts';

function Home() {

  const { allPosts } = useSelector(state => state.allPosts);
  const [allPostsList, setAllPostsList] = useState([]);
  const [allPageCount, setAllPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([])

  const getPosts = async () => {
    const list = [];
    Object.assign(list, allPosts);
    list.sort((a, b) => { return (b.Time) - (a.Time) });
    setAllPostsList(list);
  }

  useEffect(() => {

    getPosts();

    return () => {
      setAllPostsList([]);
    }

  }, [allPosts]);

  useEffect(() => {

    if (allPostsList.length !== 0) {
      setAllPageCount(Math.ceil(allPostsList.length / 15));
      setCurrentPage(1);
    }

    return () => {
      setAllPageCount(0);
      setCurrentPage(0);
    }
  }, [allPostsList]);

  useEffect(() => {

    if (allPostsList.length !== 0) {
      const indexOfFirst = (currentPage - 1) * 15;
      const indexOfLast = (indexOfFirst + 15);
      setCurrentPosts(allPostsList.slice(indexOfFirst, indexOfLast));
    }

    return () => {
      setCurrentPosts([]);
    }
  }, [currentPage]);


  if (allPostsList.length !== 0) {
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

        {subjectList.map((subject, index) => {
          if (subject.value !== "1") {
            return (
              <Link to={`/search/${subject.value}`} key={index} className='w-100 border rounded p-4 shadow-sm bg-secondary text-light cursor-pointer text-decoration-none'>
                {language.includes("tr") ? subject.tr : subject.en}
              </Link>
            )
          }
        })}

      </div>
    )
  } else {
    return (
      <div className="w-100 d-flex gap-2 p-2" aria-hidden="true">
        <div className="w-100 alert alert-warning d-flex gap-2 align-items-center" role="alert">
          {language.includes("tr") ? "Gönderi aranıyor. Lütfen bekleyin." : "Searching for post. Please Waiting"}
          <div className="spinner-border spinner-border-sm text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

      </div>
    )
  }
}

export default Home