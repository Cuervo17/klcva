'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Image from 'next/image';
import styles from '../styles/slider.module.css';

interface Cover {
  attributes: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
}

interface ProductAttributes {
  Title: string;
  Description: string;
  cover: {
    data: Cover;
  };
}

interface Product {
  id: number;
  attributes: ProductAttributes;
}

const ProductCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/products?populate=cover');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative rounded-md md:p-8 w-full overflow-hidden">
      <Slider {...settings}>
        {products.map((product) => {
          const { Title, Description, cover } = product.attributes;
          const coverImageUrl = cover?.data?.attributes?.formats?.thumbnail?.url;

          return (
            <div key={product.id} className={styles.sliderItem}>
              <div className={styles.description}>
                <h3 className="text-3xl text-center font-bold mb-2">{Title}</h3>
                <p className="text-center text-xl mb-4">{Description || 'Sin descripción disponible'}</p>
                <button
                  onClick={() => window.location.href = `/products/${product.id}`}
                  className="px-4 min-w-35 max-w-40 mx-auto py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                >
                  Más información
                </button>
                <h2 className="text-end my-8 px-12 text-2xl">KLCVA</h2>
              </div>

              {coverImageUrl ? (
                <Image
                  src={`http://localhost:1337${coverImageUrl}`}
                  alt="Nombre de subasta"
                  width={800}
                  height={600}
                  className="w-full h-48 object-contain rounded-lg mb-4 sm:h-64 md:h-72 lg:h-80"
                />
              ) : (
                <p>No hay imagen disponible</p>
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
