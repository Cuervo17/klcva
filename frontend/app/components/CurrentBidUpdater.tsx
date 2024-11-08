'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

interface CurrentBidUpdaterProps {
  productId: number;
  minimalBid: number;
  onBidUpdate: (newBid: number) => void;
}

const CurrentBidUpdater: React.FC<CurrentBidUpdaterProps> = ({ productId, minimalBid, onBidUpdate }) => {
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [currentBid, setCurrentBid] = useState<number>(0);
  const [initialPrice, setInitialPrice] = useState<number>(0); // Guardar el precio inicial

  // Recuperar el precio inicial del producto y las pujas realizadas
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/products/${productId}`);
        const productData = response.data.data;
        const productInitialPrice = productData.attributes.price; // Suponiendo que el precio inicial es 'price'
        const bids = productData.attributes.bids;

        // Calcular la oferta actual como la suma del precio inicial más todas las pujas
        const totalBids = bids.reduce((acc: number, bid: any) => acc + bid.bidAmount, 0);
        const lastBid = productInitialPrice + totalBids;

        setInitialPrice(productInitialPrice); // Establecer el precio inicial
        setCurrentBid(lastBid); // Usar la suma de todas las pujas más el precio inicial
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Actualizar el valor sugerido de la siguiente puja cuando el currentBid cambie
  useEffect(() => {
    setBidAmount(currentBid + minimalBid);
  }, [currentBid, minimalBid]);

  const handleBid = async () => {
    const bidValue = Number(bidAmount);
    if (bidValue >= currentBid + minimalBid) {
      try {
        // Crear una nueva oferta (Bid) en Strapi
        await axios.post(`http://localhost:1337/api/bids`, {
          data: {
            bidAmount: bidValue,
            product: productId  // Relaciona la oferta con el producto
          }
        });
        setCurrentBid(bidValue + currentBid); // Actualiza el valor actual de la puja sumando la nueva oferta
        onBidUpdate(bidValue + currentBid);
      } catch (error) {
        console.error('Error creating bid:', error);
      }
    } else {
      alert(`La puja debe ser al menos $${currentBid + minimalBid}`);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-200">Puja</label>
      <input
        type="number"
        value={bidAmount}
        min={currentBid + minimalBid}
        onChange={(e) => setBidAmount(Number(e.target.value))}
        className="border border-gray-300 bg-gray-800 text-white mb-2 p-2 rounded"
        placeholder="Ingresa tu puja"
      />
      <Button className="bg-white" onClick={handleBid} variant="primary">Hacer puja</Button>
    </div>
  );
};

export default CurrentBidUpdater;
