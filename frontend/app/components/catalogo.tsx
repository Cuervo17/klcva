
import styles from '../home.module.css';
import AuctionProducts from './AuctionProducts'

export default function catalogo( ) {
    
    return(
     <main className="p-8  bg-[#ffffff]  w-full h-full mx-auto grid place-items-center">
        <AuctionProducts/>
     </main>
    );
};