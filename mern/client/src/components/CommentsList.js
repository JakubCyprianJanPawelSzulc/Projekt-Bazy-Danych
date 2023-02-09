import React from 'react';
import Comment from './Comment.js';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CommentsList({onCommentsChanged, refresh }) {
  const [commentsList, setCommentsList] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/comment")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentsList(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      )
  }, [refresh])
  
  return (
    <div className="comments-list">
      {isLoaded ? (commentsList.length ? commentsList.map((el) => (
        <Comment key={el._id} onCommentsChanged={onCommentsChanged} id={el._id} user={el.user} contents={el.contents} />
      )): <p className='comments-info'>Brak komentarzy</p>):
        (loading ? <p className='comments-info'>Ładowanie komentarzy proszę czekać</p> : <p className='comments-info'>Error: {error.message}</p>)
      }
    </div>
  );
}
