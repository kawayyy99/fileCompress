import React from 'react';
import './App.css';
import Navbar from './components/header';
import FileCompressor from './components/fileCompress';  // Import komponen kompresi file
import NavTabs from './components/navTab';

function App() {
  return (
    <div className="app">
      <Navbar />
      <NavTabs />
      <div className="row">
      <div className="col-md-12 bg-light">
        <FileCompressor />
        </div>
        </div>
    </div>
  );
}
export default App;