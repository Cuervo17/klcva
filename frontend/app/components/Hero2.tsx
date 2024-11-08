// HeroComponent.tsx
'use client';
import CarouselTextBanner from './carousel-text-banner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Importa Framer Motion
import styles from '../Hero.module.css';
import ProductImage from './ProductImage';

interface Cover {
  id: number;
  url: string;
}

interface AditionalImage {
  id: number;
  url: string;
}

interface Product {
  id: number;
  productName: string;
  description?: string;
  initialPrice: number;
  minimalBid: number;
  cover: Cover[];
  aditionalImages: AditionalImage[];
  slug: string;
}

const HeroComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = 'http://localhost:1337';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products?populate=*`);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const heroProduct = products[0];

  const handleMoreInfo = (slug: string) => {
    if (slug) {
      router.push(`/detalles/${slug}`);
    } else {
      console.error('Invalid product slug:', slug);
    }
  };

  return (
    <section className={styles.hero}>
      <CarouselTextBanner />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold text-white">{heroProduct?.productName || 'Producto'}</h1>
            <p className="text-xl text-gray-300">
              {heroProduct?.description || 'Descripción no disponible'}
            </p>
            <button
              onClick={() => handleMoreInfo(heroProduct?.slug)}
              disabled={!heroProduct?.slug}
              className={`w-max bg-purple-500 text-white py-2 px-6 rounded-full hover:bg-purple-600 ${
                !heroProduct?.slug ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {heroProduct?.slug ? 'Más información' : 'No disponible'}
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProductImage
              cover={heroProduct?.cover || []}
              aditionalImages={heroProduct?.aditionalImages || []}
              apiUrl={API_URL}
              altText={heroProduct?.productName || 'Imagen del producto'}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
