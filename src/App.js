import React from 'react';
import './App.css';
import FileCompressor from './components/fileCompress';  // Import komponen kompresi file

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FileCompressor />
      </header>
    </div>
  );
}
export default App;