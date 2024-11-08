'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../styles/slider.module.css';
import { Button } from "@/components/ui/button"; // Reutiliza el componente Button

interface Cover {
  id: number;
  url: string;
}

interface Product {
  id: number;
  title: string;
  slug: string; // Agrega el slug en la interfaz
  description?: string;
  initialPrice: number;
  minimalBid: number;
  cover: Cover[];
}

const AuctionProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const API_URL = 'http://localhost:1337';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products?populate=*`);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  const handleMoreInfo = (slug: string) => {
    router.push(`/detalles/${slug}`); // Redirige usando el slug
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative rounded-md md:p-8 w-full h-full overflow-hidden">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        direction="horizontal"
        autoplay={{ delay: 7000 }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="swiper-container"
      >
        {products.map((product) => {
          const { title, description, initialPrice, minimalBid, cover, slug } = product; // Agrega slug aquí
          const coverImage = cover?.[0]?.url;

          return (
            <SwiperSlide key={product.id}>
              <div className={styles.swiper}>
                <h1 className={styles.scrypt}>KLCVA, TU MEJOR OPCIÓN EN SUBASTAS</h1>
                <div className={styles.descripcion}>
                  <h3 className="text-3xl text-center font-bold mb-2">{title}</h3>
                  <p className="text-center mb-4 text-2xl">{description || 'Sin descripción disponible'}</p>
                  <p className="text-center text-xl">Precio inicial: ${initialPrice}</p>
                  <p className="text-center text-xl">Oferta mínima: ${minimalBid}</p>
                  
                  {/* Reemplaza el botón por el componente Button */}
                  <Button
                    className="m-4 min-w-35 max-w-40 mx-auto py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => handleMoreInfo(slug)} // Usa el slug para la navegación
                  >
                    Más información
                  </Button>
                </div>

                <div className={styles.producto}>
                  {coverImage ? (
                    <Image
                      src={`${API_URL}${coverImage}`}
                      alt={title || 'Imagen de producto'}
                      width={800}
                      height={600}
                      className="w-full max-w-[250px] max-h-[300px] object-contain rounded-lg mb-4"
                    />
                  ) : (
                    <p>No hay imagen disponible</p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AuctionProducts;
