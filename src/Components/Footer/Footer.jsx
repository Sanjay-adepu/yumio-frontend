import React, { forwardRef } from 'react';
import './Footer.css';

const Footer = forwardRef((props, ref) => (
  <div ref={ref} className="footer">
    <div className="footer-content">
      <h4>About Yumio</h4>
      <p>Your go-to platform for ordering delicious meals, satisfying your cravings, one dish at a time!</p>
      <h4>Contact Us</h4>
      <p>Email: support@yumio.com | Phone: +123 456 7890</p>
      <div className="footer-social">
        <h4>Follow Us</h4>
        <p>Facebook | Twitter | Instagram</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2024 Yumio. All Rights Reserved.</p>
    </div>
  </div>
));

export default Footer;