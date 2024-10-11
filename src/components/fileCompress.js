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
    <div className="container-fluid bg-light p-5">
      <h1>File Compression</h1>
      <div class="input-group mb-3">
        <label class="input-group-text btn-outline-primary" for="inputGroupFile01">Upload</label>
        <input type="file" class="form-control" id="inputGroupFile01" accept="image/*" onChange={handleFileChange} />
        <button class="btn btn-primary" onClick={handleCompress}>Compress File</button>
      </div>

      {selectedFile && (
        <div>
          <p>Original File Size: {originalSize} KB</p>
        </div>
      )}

      {compressedFile && (
        <div>
          <p>Compressed File Size: {compressedSize} KB</p>
          <a className="btn btn-success" href={URL.createObjectURL(compressedFile)} download={compressedFile.name}>
            Download Compressed File
          </a>
        </div>
      )}
    </div>
  );
}

export default FileCompressor;