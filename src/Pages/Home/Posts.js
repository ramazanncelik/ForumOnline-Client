import React from 'react'
import { language } from '../../utils/utils'
import PostInfo from './PostInfo'

/*function Posts({posts}) {
  return (
    <div className='w-100 d-grid gap-1'>
        {posts.map(post=>{
            return(
                <PostInfo key={post._id} post={post} />
            )
        })}
    </div>
  )
}*/

function Posts({ posts }) {
  return (
    <table className="table table-hover table-sm">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">
            {language.includes("tr")?"Kullanıcı/Konu":"User/Subject"}
          </th>
          <th scope="col">
          {language.includes("tr")?"Başlık":"Title"}
          </th>
          <th scope="col">
          {language.includes("tr")?"Tarih":"Date"}
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => {
          return (
            <PostInfo key={post._id} index={index} post={post} />
          )
        })}
      </tbody>
    </table>
  )
}

export default Posts