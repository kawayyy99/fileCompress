import React from 'react';
import LogoNavbar from "../assets/img/logo/kaway.png";

function Footer() {
  return (
    <div className="footer-menu container-fluid p-2 bg-dark text-center text-white">
      <p><img className="logo" style={{"width":"30px"}} src={LogoNavbar} />Aku footer</p>
    </div>
  );
}

export default Footer;