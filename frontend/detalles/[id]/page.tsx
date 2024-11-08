import axios from 'axios';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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
}

const API_URL = 'http://localhost:1337';

// Esta función obtiene los datos del producto
async function getProduct(id: string) {
  try {
    const response = await axios.get(`${API_URL}/api/products/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Este componente maneja la visualización del producto según su ID
export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const { productName, description, cover, aditionalImages, initialPrice, minimalBid } = product.attributes;
  const coverImage = cover?.[0]?.url;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-6xl font-bold text-black">{productName}</h1>
          <p className="text-xl text-gray-700">{description || 'Descripción no disponible'}</p>
          <p className="text-2xl text-gray-900">Precio inicial: ${initialPrice}</p>
          <p className="text-xl text-gray-600">Puja mínima: ${minimalBid}</p>
        </div>
        
        <div className="relative">
          {coverImage ? (
            <Image
              src={`${API_URL}${coverImage}`}
              alt={productName}
              width={400}
              height={300}
              className="rounded-lg shadow-lg max-h-[350px] object-contain"
            />
          ) : (
            <p>No hay imagen disponible</p>
          )}

          <div className="grid grid-cols-4 gap-4 mt-4">
            {aditionalImages?.map((img: AditionalImage) => (
              <Image
                key={img.id}
                src={`${API_URL}${img.url}`}
                alt={`Imagen adicional de ${productName}`}
                width={100}
                height={100}
                className="rounded-lg shadow-md max-h-[250px] object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
