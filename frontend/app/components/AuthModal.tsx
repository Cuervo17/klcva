// components/AuthModal.tsx
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <>
      <button onClick={toggleModal} className="btn-primary">
        Iniciar sesión 
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-sm relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-center text-2xl font-semibold mb-4">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </h2>
            {isLogin ? <Login /> : <Register />}
            <button onClick={toggleAuthMode} className="mt-4 text-blue-500 w-full">
              {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
