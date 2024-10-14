import React, { useState } from 'react';

const LinkConverter = () => {
  const [videoLink, setVideoLink] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setVideoLink(e.target.value);
  };

  const fetchDownloadLink = async () => {
    setLoading(true);
    setError('');

    try {
      // Mengirimkan permintaan POST ke backend Node.js
      const response = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoLink }),
      });

      const data = await response.json();

      if (response.ok) {
        setDownloadLink(data.downloadUrl); // Menyimpan URL unduhan
      } else {
        setError(data.message || 'Gagal mendapatkan tautan unduhan');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil tautan unduhan');
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid p-5">
      <h2>Video Link Converter</h2>
      <input 
        type="text" 
        value={videoLink} 
        onChange={handleInputChange} 
        placeholder="Masukkan tautan video (YouTube, TikTok, Instagram)" 
        className="form-control my-3" 
      />
      <button 
        className="btn btn-primary" 
        onClick={fetchDownloadLink} 
        disabled={!videoLink || loading}
      >
        {loading ? 'Mengonversi...' : 'Konversi Tautan'}
      </button>

      {error && <div className="alert alert-danger my-3">{error}</div>}

      {downloadLink && (
        <div className="my-3">
          <h5>Tautan Unduhan:</h5>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Unduh Video
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkConverter;