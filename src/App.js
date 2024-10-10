import React from 'react';
import './App.css';
import Navbar from './components/header';
import FileCompressor from './components/fileCompress';  // Import komponen kompresi file

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="row">
      <div className="col-md-6">
        <FileCompressor />
        </div>
        </div>
    </div>
  );
}
export default App;