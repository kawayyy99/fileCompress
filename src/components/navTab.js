import React, { useState } from 'react';
import FileCompressor from './fileCompress'; 
import FileConverter from './fileConverter';
import FileLinkConverter from './fileLinkDownload';

const NavPills = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('compression');

  // Function to handle tab switching
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="container-fluid p-0">
        <ul className="nav nav-pills nav-fill m-3">
          <li className="nav-item">
            {/* Change active tab to 'compression' when this link is clicked */}
            <a 
              className={`nav-link ${activeTab === 'compression' ? 'active' : ''}`}
              onClick={() => handleTabChange('compression')} 
              href="#"
            >
              File Compression
            </a>
          </li>
          <li className="nav-item">
            {/* Change active tab to 'converter' when this link is clicked */}
            <a 
              className={`nav-link ${activeTab === 'converter' ? 'active' : ''}`}
              onClick={() => handleTabChange('converter')} 
              href="#"
            >
              Extension Converter
            </a>
          </li>
          <li className="nav-item">
            {/* Change active tab to 'downloader' when this link is clicked */}
            <a 
              className={`nav-link ${activeTab === 'downloader' ? 'active' : ''}`} 
              onClick={() => handleTabChange('downloader')} 
              href="#"
            >
              Link Converter Downloader
            </a>
          </li>
          <li className="nav-item">
          <a 
              className={`nav-link ${activeTab === 'disabled' ? 'active' : ''}`} 
              onClick={() => handleTabChange('disabled')} 
              href="#"
              >
              Disabled
            </a>
          </li>
        </ul>
      </div>

      {/* Render content based on active tab */}
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-md-12 bg-light">
            {activeTab === 'compression' && <FileCompressor />}
            {activeTab === 'converter' && <FileConverter />}
            {activeTab === 'downloader' && <FileLinkConverter/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavPills;