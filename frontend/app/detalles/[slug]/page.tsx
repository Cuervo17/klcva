'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TimeRemaining from '@/app/components/Timer'; // Importa el nuevo componente
import CurrentBidUpdater from '@/app/components/CurrentBidUpdater'; // Importa el nuevo componente

interface Product {
  id: number;
  productName: string;
  description?: string;
  initialPrice: number;
  minimalBid: number;
  currentBid: number;
  cover: { url: string }[];
  initialDate: string;
  finalDate: string;
}

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const API_URL = 'http://localhost:1337';
  try {
    const response = await axios.get(`${API_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`);
    if (response.data.data.length > 0) {
      return response.data.data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default function ProductDetails({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await fetchProductBySlug(params.slug);
      if (productData) {
        setProduct(productData);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return <div className="text-white">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="text-white">Producto no encontrado</div>;
  }

  const handleBidUpdate = (newBid: number) => {
    setProduct({ ...product, currentBid: newBid });
  };

  return (
    <div className="flex flex-col md:flex-row h-full items-center bg-gradient-to-r from-customGray1 via-customGray2 to-black
 p-6 rounded-lg shadow-lg max-w-3xl border border-gray-700 mx-auto">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}${product.cover[0].url}`} // Asegúrate de que la URL de la imagen sea correcta
        alt={product.productName}
        className="w-full max-w-[250px] h-auto rounded-lg mb-4 md:mb-0  md:w-1/2"
      />
      <div className="md:ml-4 flex flex-col w-full">
        <h1 className="text-3xl font-bold mb-2 text-white">{product.productName}</h1>
        <p className="text-gray-300 mb-4">{product.description || 'Sin descripción disponible'}</p>
        <div className="mb-4">
          <TimeRemaining finalDate={product.finalDate} /> {/* Usa el nuevo componente */}
        </div>
        <CurrentBidUpdater
          productId={product.id}
          initialCurrentBid={product.currentBid}
          minimalBid={product.minimalBid}
          onBidUpdate={handleBidUpdate}
        />
        <div className="flex justify-between items-center w-full mt-4">
          <span className="text-lg font-semibold text-white">Precio inicial: ${product.initialPrice}</span>
          <span className="text-lg font-semibold text-white">Oferta mínima: ${product.minimalBid}</span>
          <span className="text-lg font-semibold text-white">Oferta actual: ${product.currentBid}</span>
        </div>
      </div>
    </div>
  );
}
