// ProductImage.tsx
import Image from 'next/image';

interface Cover {
  id: number;
  url: string;
}

interface AditionalImage {
  id: number;
  url: string;
}

interface ProductImageProps {
  cover: Cover[];
  aditionalImages: AditionalImage[];
  apiUrl: string;
  altText: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ cover, aditionalImages, apiUrl, altText }) => {
  const coverImage = cover?.[0]?.url || '/fallback-image.png'; // Imagen de fallback

  return (
    <div className="relative">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={`${apiUrl}${coverImage}`}
          alt={altText}
          width={400}
          height={300}
          className="rounded-lg shadow-lg max-h-[350px] object-contain"
        />
        <div className="grid grid-cols-4 gap-4">
          {aditionalImages?.map((img) => (
            <Image
              key={img.id}
              src={`${apiUrl}${img.url}`}
              alt={`${altText} - Imagen adicional`}
              width={100}
              height={100}
              className="rounded-lg shadow-md max-h-[250px] object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
