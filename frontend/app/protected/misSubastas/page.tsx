'use client'
import { motion } from 'framer-motion';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const MisSubastas = () => {
  const [subastas, setSubastas] = useState([]);

  useEffect(() => {
    // Aquí iría la lógica para obtener las subastas del usuario autenticado
    const fetchSubastas = async () => {
      const session = await getSession();
      if (session) {
        const res = await fetch(`/api/subastas?user=${session.user.id}`);
        const data = await res.json();
        setSubastas(data);
      }
    };
    fetchSubastas();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Subastas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subastas.length > 0 ? (
          subastas.map((subasta, index) => (
            <motion.div
              key={subasta.id}
              className="bg-white shadow-md rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-lg font-semibold">{subasta.nombre}</h2>
              <p className="text-gray-500">Puja actual: ${subasta.pujaActual}</p>
              <Link href={`/detalles/${subasta.id}`}>
                <a className="text-blue-500 mt-2 inline-block">Ver detalles</a>
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-600"
          >
            No tienes subastas activas.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default MisSubastas;
