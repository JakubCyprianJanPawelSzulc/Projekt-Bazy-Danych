import { useFormik } from 'formik';
import React from 'react';

export default function CommentForm({ onCommentsChanged }) {

  const formik = useFormik({
    initialValues: {
      contents: '',
      user: '',
    },
    onSubmit: (values) => {
      fetch('http://localhost:5000/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }).then((res) => {
          onCommentsChanged();
      })
      formik.resetForm({
        values: { 
          contents: '', 
          user: '' 
        },
      });
    },
  });

  return (
    <div id="comments" className="comments-form">
      <form className="comment-form-contents" onSubmit={formik.handleSubmit}>
        <input
          value={formik.values.user}
          name="user"
          placeholder="użytkownik"
          onChange={formik.handleChange}
          required
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <textarea
          value={formik.values.contents}
          name="contents"
          placeholder="komentarz"
          onChange={formik.handleChange}
          required
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <button className="comment-submit-button" type="submit">
          dodaj
        </button>
      </form>
    </div>
  );
}
