import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/appstore.png";
import "./Footer.css"

export const Footer = () => {
  return (
    <footer id="footer">
    <div className="leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS mobile phone</p>
      <img src={playStore} alt="playstore" />
      <img src={appStore} alt="Appstore" />
    </div>

    <div className="midFooter">
      <h1>Graphic Designers Hub</h1>
      <p>High Quality is our first priority</p>

      <p>Copyrights 2022 &copy; GraphicDesignerHub</p>
    </div>

    <div className="rightFooter">
      <h4>Follow Us</h4>
      <a href="https://www.instagram.com/_abhi_0808_">Instagram</a>
      <a href="https://www.youtube.com/">Youtube</a>
    </div>
  </footer>
  );
};

export default Footer;
