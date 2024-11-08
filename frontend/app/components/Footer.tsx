import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">KLCVA</h2>
          <p className="text-sm">© 2024 Derechos reservados.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaLinkedinIn />
          </a>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
          <Link className="text-gray-400 hover:text-white transition" href="/">
            Inicio
          </Link>
          <Link className="text-gray-400 hover:text-white transition" href="/about">
            Sobre Nosotros
          </Link>
          <Link className="text-gray-400 hover:text-white transition" href="/services">
            Servicios
          </Link>
          <Link className="text-gray-400 hover:text-white transition" href="/contact">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
