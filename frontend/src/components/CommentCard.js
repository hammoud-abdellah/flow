import React, { useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import {Avatar} from "antd";

function CommentCard({comments}) {
    const [liked, setLiked] = useState(false);

    //liked comment
    const handleLikeClick = () => {
       setLiked(!liked);
    };
  return (
    <div>
        {comments.map((comment, index)=> (
                <div key={index} className="bg-MyGray  my-2 rounded-md">
                <div className='flex justify-between'>
                    <div className='flex '>
                        <Avatar 
                            className='m-2'
                            src={"https://joesch.moe/api/v1/random?key=1"}
                            />
                            <h4 className='m-2'>{comment.author}</h4>
                    </div>
                    <div className='m-3'>
                        <p className='text-xs italic'>{comment.createdAt}</p>
                    </div>
                </div>
                <div className='p-6'>
                    <p>{comment.content}</p>
                </div>
                <div className='flex justify-between  p-2 border-t-2 border-t-gray-400'>
                    <button onClick={handleLikeClick}>
                        {liked ? (
                        <AiOutlineLike style={{ color: 'blue' }} />
                        ) : (
                        <AiOutlineLike style={{ color: 'white' }} />
                        )}
                    </button>
                    <button className='italic'>Replay</button>
                </div>
            </div>
        ))}
    </div>

  )
}

export default CommentCard