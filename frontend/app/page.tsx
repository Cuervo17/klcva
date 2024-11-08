'use client'; // Necesario para que el componente funcione en el modo de cliente
import Catalogo from "./components/catalogo";
import Unete from "./components/Unete";
import FaqSection from "./components/FaqSection";
import Hero2 from "./components/Hero2"
const Home: React.FC = () => {
  return (
    <div>

      <section>
        <Hero2/>
      </section>

      <section>
        <FaqSection />
      </section>

      <section>
        <Catalogo />
      </section>

      <section>
        <Unete />
      </section>
    </div>
  );
}

export default Home;
