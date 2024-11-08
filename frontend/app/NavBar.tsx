"use client";

import AuthModal from "./components/AuthModal"
import { auth } from "@/auth";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuItemClick = () => setIsMenuOpen(false);

  return (
    <nav className="bg-navegacion lg:py-4 z-50 sticky top-0 h-18 max-w-screen overflow-x-hidden">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-4 md:gap-8">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Image 
              src="/klicva-logo.png"
              width={70}
              height={100}
              alt="logo"
              className="h-12 w-auto rounded-lg"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Image 
              src="/klicva-letra.png"
              width={100}
              height={100}
              alt="letra"
              className="h-12 w-auto rounded-lg"
            />
          </motion.div>
        </div>

        {/* Navegación */}
        <div className="hidden md:flex space-x-10">
          <Link href="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2">INICIO</Link>
          <Link href="/subastas" className="text-white hover:bg-white hover:text-black rounded-lg p-2">SUBASTAS</Link>
          <Link href="/informacion" className="text-white hover:bg-white hover:text-black rounded-lg p-2">INFORMACIÓN</Link>
        </div>

        {/* Iniciar sesión / Nombre de usuario */}
        <div className="flex items-center">
          {session ? (
            <div className="flex items-center space-x-4">
              <p className="text-white">Hola, {session.user?.name}</p>
              <button 
                onClick={() => signOut()}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
              <AuthModal/>
          )}
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {isMenuOpen && (
        <motion.div 
          className="fixed top-18 right-0 w-full max-w-md bg-white rounded-lg shadow-lg py-2 z-20 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{ maxHeight: 'calc(100vh - 72px)' }}
        >
          <div className="flex flex-col space-y-2">
            <Link href="/" className="block px-4 py-2 text-black hover:bg-gray-100" onClick={handleMenuItemClick}>INICIO</Link>
            <Link href="/subastas" className="block px-4 py-2 text-black hover:bg-gray-100" onClick={() => router.push("./misSubastas")}>MIS SUBASTAS</Link>
            <Link href="/informacion" className="block px-4 py-2 text-black hover:bg-gray-100" onClick={handleMenuItemClick}>INFORMACIÓN</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;
