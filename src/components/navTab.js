import React from 'react';

const NavPills = () => {
  return (
    <div className="container-fluid p-0">
      <ul className="nav nav-pills nav-fill m-3">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">File Compression</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Extension Converter</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link Converter Downloader</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  );
}

export default NavPills;