import { useFormik } from 'formik';
import React from 'react';

export default function EditCommentForm(comment) {
  const initialValues = {
    id: comment.id,
    contents: comment.contents,
    user: comment.user,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      fetch(`http://localhost:5000/comment/update/${values.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }).then((res) => {
        comment.onCommentsChanged();
      });
      formik.resetForm({
        values: {
          id: comment.id,
          contents: '',
          user: '',
        },
      })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
      <button className="submit-button" type="submit">
        akceptuj
      </button>
    </form>
  );
}
