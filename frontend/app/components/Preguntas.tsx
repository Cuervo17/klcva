import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preguntas = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Especificar que puede ser un número o null

  const faqs = [
    {
      question: '¿Cómo participo en una subasta?',
      answer: 'Para participar, debes registrarte en la página y luego pujar en la subasta de tu interés.',
    },
    {
      question: '¿Cuáles son los métodos de pago disponibles?',
      answer: 'Aceptamos pagos mediante tarjeta de crédito, PayPal y transferencia bancaria.',
    },
    {
      question: '¿Qué pasa si gano una subasta?',
      answer: 'Si ganas una subasta, recibirás un correo con las instrucciones para completar el pago y recibir tu producto.',
    },
    {
      question: '¿Puedo retractarme de una oferta?',
      answer: 'Una vez realizada una oferta, no es posible retractarse. Todas las ofertas son vinculantes.',
    },
    {
      question: '¿Hay algún costo por participar en una subasta?',
      answer: 'Participar es gratuito, pero si ganas, se aplicarán cargos adicionales por gestión y envío.',
    },
  ];

  const toggleFAQ = (index: number) => { // Especificar el tipo de index como número
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="hidden md:block w-full h-full p-6 bg-[#312F31] text-white rounded-lg">
      <h2 className="text-3xl mb-6 text-center">Preguntas Frecuentes</h2>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6">
            <div
              className="text-xl cursor-pointer hover:text-gray-300"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="mt-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preguntas;
