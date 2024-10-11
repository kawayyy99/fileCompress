import React from 'react';
import './App.css';
import Navbar from './components/header';
import FileCompressor from './components/fileCompress';  // Import komponen kompresi file
import NavTabs from './components/navTab';
import FileConverter from './components/fileConverter';

function App() {
  return (
    <div className="app">
      <Navbar />
      <NavTabs />
      <div className="row">
        <div className="col-md-12 bg-light">
          <FileCompressor />
        </div>
        <div className="col-md-12 bg-light">
          <FileConverter />
        </div>
      </div>
    </div>
  );
}
export default App;