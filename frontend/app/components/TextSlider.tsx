import React from 'react';

interface TextSliderProps {
  description: string;
  finalDate: string;
  status: string;
}

const TextSlider: React.FC<TextSliderProps> = ({ description, finalDate, status }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0)); 
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="w-full text-white bg-navegacion rounded-xl overflow-hidden relative mt-8">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* Slide 1: Descripción */}
        <div className="w-full flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Descripción</h2>
          <p className="text-lg text-center">{description}</p>
        </div>

        {/* Slide 2: KLCVA y Status */}
        <div className="w-full flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-2 text-center">KLCVA</h2>
          <p className="text-lg mb-4 text-center">Tu mejor opción en subastas</p>
          <h3 className="text-xl text-center">Status: {status}</h3>
          <h3 className="text-lg mt-2 text-center">Finaliza: {finalDate}</h3>
        </div>
      </div>

      {/* Indicadores de los slides */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-2">
        <span className={`w-3 h-3 rounded-full ${currentSlide === 0 ? 'bg-blue-600' : 'bg-gray-300'}`} />
        <span className={`w-3 h-3 rounded-full ${currentSlide === 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
      </div>
    </div>
  );
};

export default TextSlider;
