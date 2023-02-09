import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditCommentForm from './EditCommentForm.js';

export default function Comment(props) {
  const [isEditing, setIsEditing] = useState(false);
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  function handleDeleteClick() {
    fetch(`http://localhost:5000/comment/delete/${props.id}`, {
      method: 'DELETE',
    }).then((res) => {
      props.onCommentsChanged();
    }
    );
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleStopEditClick() {
    setIsEditing(false);
  }

  return (
    <div className="comment" id={props.id}>
      <p className="comment-user">{props.user}</p>
      <p className="comment-contents">{props.contents}</p>
      {isLoggedIn && (
        <div className="comment-admin-panel">
          <button onClick={handleDeleteClick}>Usuń komentarz</button>
          {isEditing ? (
            <div>
              <button onClick={handleStopEditClick}>Skończ edytować</button>
              <EditCommentForm
                onCommentsChanged={props.onCommentsChanged}
                id={props.id}
                user={props.user}
                contents={props.contents}
                setIsEditing={setIsEditing}
              />
            </div>
          ) : (
            <button onClick={handleEditClick}>Edytuj komentarz</button>
          )}
        </div>
      )}
    </div>
  );
}
