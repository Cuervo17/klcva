// app/protected/perfil/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Perfil() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
        <p className="text-lg">Nombre: {session.user?.name}</p>
        <p className="text-lg">Correo: {session.user?.email}</p>
      </div>
    </motion.div>
  );
}
