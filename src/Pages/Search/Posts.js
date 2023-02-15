import React from 'react'
import PostInfo from './PostInfo'

function Posts({posts}) {
  return (
    <div className='w-100 d-grid gap-1'>
        {posts.map(post=>{
            return(
                <PostInfo key={post._id} post={post} />
            )
        })}
    </div>
  )
}

export default Posts