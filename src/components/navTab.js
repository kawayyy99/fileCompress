import React from 'react';

const NavPills = () => {
  return (
    <div className="container-fluid p-0 m-3">
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Active</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Much longer nav link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    </div>
  );
}

export default NavPills;