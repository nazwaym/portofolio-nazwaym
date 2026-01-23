import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0b0b14] py-12 border-t border-white/5">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h3 className="text-xl font-bold font-display text-white mb-1">Nazwa<span className="text-secondary"> Yulianti M</span></h3>
                </div>

                <div className="flex space-x-6">
                    <a href="https://github.com/nazwaym" className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/nazwa-yulianti-munjana-89775b2b4/" className="text-gray-400 hover:text-secondary transition-colors hover:scale-110 transform">
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
