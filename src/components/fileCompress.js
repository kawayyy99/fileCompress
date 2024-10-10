import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

function FileCompressor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setOriginalSize((file.size / 1024).toFixed(2)); // Ukuran asli dalam KB
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const options = {
      maxSizeMB: 1,        // Ukuran maksimum file setelah kompresi (MB)
      maxWidthOrHeight: 1024, // Maksimum dimensi gambar (px)
      useWebWorker: true    // Untuk mempercepat kompresi
    };

    try {
      const compressed = await imageCompression(selectedFile, options);
      setCompressedFile(compressed);
      setCompressedSize((compressed.size / 1024).toFixed(2)); // Ukuran kompres dalam KB
    } catch (error) {
      console.error('Error compressing file:', error);
    }
  };

  return (
    <div>
      <h1>File Compression</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleCompress}>Compress File</button>

      {selectedFile && (
        <div>
          <p>Original File Size: {originalSize} KB</p>
        </div>
      )}

      {compressedFile && (
        <div>
          <p>Compressed File Size: {compressedSize} KB</p>
          <a href={URL.createObjectURL(compressedFile)} download={compressedFile.name}>
            Download Compressed File
          </a>
        </div>
      )}
    </div>
  );
}

export default FileCompressor;