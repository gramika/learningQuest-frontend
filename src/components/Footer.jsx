import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#008080] text-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">

        {/* text Content */}
        <div className="text-center md:text-left flex-1">
          <p className="text-2xl font-semibold text-white">Learning Quest</p>
          <p className="text-gray-200 mt-2">A MEARN-based interview preparation platform.</p>

          <div className="flex justify-center md:justify-start space-x-4 text-sm mt-4">
            <a href="/privacyPolicy" className="hover:text-gray-300">Privacy Policy</a>
            <span>|</span>
            <a href="/terms" className="hover:text-gray-300">Terms</a>
            <span>|</span>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
          </div>

          <p className="text-sm text-gray-300 mt-4 text"> <span className='text-2xl'>&copy;</span>
           2025 <span className="font-medium">Learning Quest</span>. All rights reserved.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/user/quizzes" className="hover:text-gray-300">Quizzes</Link></li>
            <li><Link to="/user/allNotes" className="hover:text-gray-300">Notes</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Connect With Us</h3>
          <div className="flex space-x-5 text-2xl">
            <a href="#" className="hover:text-gray-300 transition-colors">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
