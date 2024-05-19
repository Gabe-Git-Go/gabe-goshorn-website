import React from 'react';
import { BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaSoundcloud } from 'react-icons/fa';
import { GrGithub } from 'react-icons/gr';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Gabriel Goshorn. All rights reserved.</p>
        <div className='footer-social-links'>
            <a href="https://www.instagram.com/g_a_b_e__g__b_a_b_y/"><BsInstagram/></a>
            <a href="https://soundcloud.com/gabe-goshorn"><FaSoundcloud/></a>
            <a href="https://www.linkedin.com/in/gabriel-goshorn/"><BsLinkedin/></a>
            <a href="https://github.com/Gabe-Git-Go"><GrGithub/></a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;