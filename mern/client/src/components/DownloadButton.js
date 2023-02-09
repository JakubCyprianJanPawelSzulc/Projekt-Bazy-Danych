import React from 'react';

export default function DownloadButton(props) {
  const handleClick = () => {
    const { data, typeOfData } = props;
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <button className="download-button" onClick={handleClick}>
      ⇓ pobierz {props.typeOfData}
    </button>
  );
}
