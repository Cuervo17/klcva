'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from "./home.module.css";

const questions = [
  {
    question: '¿Cómo puedo participar en las subastas?',
    answer: 'Para participar en las subastas, primero debes crear una cuenta en nuestro sitio web. Luego, puedes navegar a la sección de subastas y hacer clic en cualquier subasta que te interese para ver más detalles y realizar una oferta.',
  },
  {
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer: 'Aceptamos pagos mediante tarjetas de crédito principales como Visa, MasterCard y American Express. También ofrecemos la opción de pago mediante PayPal para mayor conveniencia.',
  },
  {
    question: '¿Cómo sé si he ganado una subasta?',
    answer: 'Una vez que finaliza una subasta en la que has participado, recibirás una notificación por correo electrónico con los detalles de tu oferta y la confirmación de si has ganado o no la subasta.',
  },
  {
    question: '¿Puedo retractarme de una oferta?',
    answer: 'Una vez realizada una oferta, no es posible retractarse. Todas las ofertas son vinculantes.',
  },
  {
    question: '¿Hay algún costo por participar en una subasta?',
    answer: 'Participar es gratuito, pero si ganas, se aplicarán cargos adicionales por gestión y envío.',
  },
  // Puedes agregar más preguntas según sea necesario
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-black h-screen flex flex-col md:pt-20 justify-center text-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-8">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="border-b border-gray-700">
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-left focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-xl">{q.question}</span>
                <svg
                  className={`w-6 h-6 ${activeIndex === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: activeIndex === index ? 1 : 0, height: activeIndex === index ? 'auto' : 0 }}
                transition={{ opacity: { duration: 0.3 }, height: { duration: 0.5 } }}
              >
                <p className="px-4 py-3">{q.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
