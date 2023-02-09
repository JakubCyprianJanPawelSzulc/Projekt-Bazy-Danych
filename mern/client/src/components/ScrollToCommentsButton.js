import React from 'react';

export default function ScrollToCommentsButton() {
  const handleClick = () => {
    const commentsSection = document.getElementById('comments');
    commentsSection.scrollIntoView();
  };

  return (
    <a
      href="#comments-form"
      className="scroll-to-comments-button"
      onClick={handleClick}
    >
      🗨 komentarze
    </a>
  );
}
