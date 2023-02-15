import React from 'react'
import CommentInfo from './CommentInfo'

function Comments({ comments, isDeletedComment, setIsDeletedComment }) {

    return (
        <div className='w-100 d-grid gap-2'>
            {comments.map(comment => {
                return (
                    <CommentInfo key={comment._id} commentInfo={comment} isDeletedComment={isDeletedComment} setIsDeletedComment={setIsDeletedComment} />
                )
            })}
        </div>
    )
}

export default Comments