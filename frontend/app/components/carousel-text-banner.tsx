'use client'
import { useRouter } from 'next/navigation';
import { Carousel, CarouselItem, CarouselContent } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from 'embla-carousel-autoplay';

export const dataCarouselTop = [
    {
        id: 1,
        title: "KLCVA, TU MEJOR OPCIÓN EN SUBASTAS",
        description: "Somos una empresa con más de 20 años de experiencia en subastas",
        link: "#"
    },
    {
        id: 2,
        title: "ENVIOS SEGUROS!!!",
        description: "Nuestros envios son 100% protegidos y garantizados",
        link: "#"
    },
    {
        id: 3,
        title: "KLCVA",
        description: "Una elegante y fácil manera de hacer subastas",
        link: "#"
    },
];

const CarouselTextBanner = () => {
    const router = useRouter();
    return (
        <div className="bg-navegacion mt-4 h-full max-h-[100px] flex justify-center items-center text-white w-full relative  overflow-x-hidden">
            <Carousel
                className="w-screen max-w-[100vw] overflow-hidden"
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
            >
                <CarouselContent className="flex w-full">
                    {dataCarouselTop.map(({ id, title, link, description }) => (
                        <CarouselItem
                            key={id}
                            onClick={() => router.push(link)}
                            className="cursor-pointer w-[100vw] flex-shrink-0"
                        >
                            <div className="w-full">
                                <Card className="shadow-none border-none bg-transparent w-full">
                                    <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                        <p className="sm:text-4xl text-wrap text-white">{title}</p>
                                        <p className="sm:text-2xl text-wrap text-white">{description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default CarouselTextBanner;
