import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = new FFmpeg({ log: true }); // Menggunakan 'new FFmpeg()' jika createFFmpeg tidak ada

function FileConverter() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [outputFormat, setOutputFormat] = useState('');
    const [fileType, setFileType] = useState('');
    const [convertedFile, setConvertedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
        setOutputFormat(''); // Reset output format on file type change
    };

    const handleFormatChange = (event) => {
        setOutputFormat(event.target.value);
    };

    const handleConvert = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        if (fileType === 'image') {
            await convertImage();
        } else if (fileType === 'audio' || fileType === 'video') {
            await convertMedia();
        } else if (fileType === 'document') {
            await convertDocument();
        } else if (fileType === 'spreadsheet') {
            await convertSpreadsheet();
        } else if (fileType === 'text') {
            await convertText();
        } else if (fileType === 'zip') {
            await convertZip();
        }
    };

    // Function to convert image using browser-image-compression
    const convertImage = async () => {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };

        try {
            const compressedFile = await imageCompression(selectedFile, options);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.src = URL.createObjectURL(compressedFile);
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                    const file = new File([blob], `${selectedFile.name.split('.')[0]}.${outputFormat}`, {
                        type: `image/${outputFormat}`,
                    });
                    setConvertedFile(URL.createObjectURL(file));
                }, `image/${outputFormat}`);
            };
        } catch (error) {
            console.error('Error during image conversion:', error);
        }
    };

    // Function to convert audio/video using ffmpeg.js
    const convertMedia = async () => {
        await ffmpeg.load();

        // Menggunakan FileReader untuk membaca file input
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = async () => {
            const fileData = new Uint8Array(reader.result);

            // Simpan file ke sistem file virtual FFmpeg
            ffmpeg.FS('writeFile', selectedFile.name, fileData);

            // Jalankan konversi
            await ffmpeg.run('-i', selectedFile.name, `output.${outputFormat}`);

            // Baca hasil output
            const data = ffmpeg.FS('readFile', `output.${outputFormat}`);
            const fileURL = URL.createObjectURL(new Blob([data.buffer], { type: `${fileType}/${outputFormat}` }));

            setConvertedFile(fileURL);
        };

        reader.onerror = () => {
            console.error('Error reading file:', reader.error);
        };
    };

    // Placeholder function for document conversion
    const convertDocument = async () => {
        alert("Document conversion is not yet implemented.");
    };

    // Placeholder function for spreadsheet conversion
    const convertSpreadsheet = async () => {
        alert("Spreadsheet conversion is not yet implemented.");
    };

    // Placeholder function for text conversion
    const convertText = async () => {
        alert("Text conversion is not yet implemented.");
    };

    // Placeholder function for ZIP conversion
    const convertZip = async () => {
        alert("ZIP conversion is not yet implemented.");
    };

    return (
        <div className="container-fluid p-5">
            <h1>File Converter</h1>
            <div className="row">
                <div className="col-md-3 p-3">
                    <label className="me-3">File Type:</label>
                    <select className="btn btn-outline-primary dropdown-toggle me-3" onChange={handleFileTypeChange} value={fileType}>
                        <option value="">Select File Type</option>
                        <option value="image">Image</option>
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                        <option value="document">Document</option>
                        <option value="spreadsheet">Spreadsheet</option>
                        <option value="text">Text</option>
                        <option value="zip">ZIP</option>
                    </select>
                </div>
                <div className="col-md-9 p-3">
                    {fileType && (
                        <>
                            <label className="me-3">Output Format:</label>
                            <select className="btn btn-outline-info dropdown-toggle" onChange={handleFormatChange} value={outputFormat}>
                                <option value="">Select Output Format</option>
                                {fileType === 'image' && (
                                    <>
                                        <option value="jpeg">JPEG</option>
                                        <option value="png">PNG</option>
                                        <option value="webp">WEBP</option>
                                    </>
                                )}
                                {fileType === 'audio' && (
                                    <>
                                        <option value="mp3">MP3</option>
                                        <option value="wav">WAV</option>
                                        <option value="ogg">OGG</option>
                                    </>
                                )}
                                {fileType === 'video' && (
                                    <>
                                        <option value="mp4">MP4</option>
                                        <option value="avi">AVI</option>
                                        <option value="mov">MOV</option>
                                    </>
                                )}
                                {fileType === 'document' && (
                                    <>
                                        <option value="pdf">PDF</option>
                                        <option value="docx">DOCX</option>
                                    </>
                                )}
                                {fileType === 'spreadsheet' && (
                                    <>
                                        <option value="xlsx">XLSX</option>
                                    </>
                                )}
                                {fileType === 'text' && (
                                    <>
                                        <option value="txt">TXT</option>
                                    </>
                                )}
                                {fileType === 'zip' && (
                                    <>
                                        <option value="zip">ZIP</option>
                                    </>
                                )}
                            </select>
                        </>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 p-3">
                    <div className="input-group">
                        <input class="form-control" type="file" accept={`${fileType}/*`} onChange={handleFileChange} />
                        <button className="btn btn-primary" onClick={handleConvert}>Convert File</button>
                    </div>
                </div>
                <div className="col-md-6">
                    {convertedFile && (
                        <div>
                            <h2>Converted File:</h2>
                            <a className="btn btn-success" href={convertedFile} download={`output.${outputFormat}`}>
                                Download Converted File
                            </a>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default FileConverter;