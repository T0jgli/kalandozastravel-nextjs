import React, { useEffect, useState } from "react";
import { HiCheck, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import useScreenWidth from "../../lib/hooks/useScreenWidth";
import MainCards from "./MainCards";
import Modal from "./Modal";
import ModalMuseums from "./ModalHotels";

const CustomCarousel = ({ travels }) => {
    const [active, setActive] = useState(1);
    const [isMobile] = useScreenWidth(1279);
    const [modalOpen, setModalOpen] = useState({
        open: false,
    });

    const [hotelsModal, setHotelsModal] = useState({
        open: false,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev === 18 ? 1 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <ModalMuseums hotelsModal={hotelsModal} setHotelsModal={setHotelsModal} />

            <div
                className={`bg-fixed bg-center overflow-hidden duration-300 shadow-lg bg-cover relative max-w-screen md:mb-0`}
                style={{
                    backgroundImage: `url('/img/carousel/${active}.jpg')`,
                    height: "calc(100vh - 144px)",
                    minHeight: "430px",
                }}
            >
                <div className="absolute overflow-hidden gap-3 mb-32 text-white flex-col flex justify-center items-center top-0 left-0 w-full h-full z-10 bg-black bg-opacity-50">
                    <h1 className="text-center text-3xl md:text-4xl font-semibold mb-8">Neoline-Kalandozás Utazási Iroda</h1>
                    <h2 className="tracking-wider font-light mb-2 inline-flex items-center">
                        <HiCheck className="pr-2" fontSize="2rem" /> Kultúrát és élményt adunk <HiCheck className="pl-2" fontSize="2rem" />
                    </h2>

                    {!isMobile && <MainCards travels={travels} setModalOpen={setModalOpen} carousel setHotelsModal={setHotelsModal} />}
                </div>
                <div className="absolute h-full z-10 right-0 top-0 bg-black bg-opacity-5 duration-300 hover:bg-opacity-10 w-12 xl:w-36 2xl:w-64">
                    <div
                        className="flex w-full h-full items-center justify-center text-3xl text-gray-100 cursor-pointer"
                        onClick={() => setActive(active === 18 ? 1 : active + 1)}
                    >
                        <HiChevronRight />
                    </div>
                </div>
                <div className="absolute z-10 h-full left-0 top-0 bg-black bg-opacity-5 duration-300 hover:bg-opacity-10 w-12 xl:w-36 2xl:w-64">
                    <div
                        className="flex w-full h-full items-center justify-center text-3xl text-gray-100 cursor-pointer"
                        onClick={() => setActive(active === 1 ? 18 : active - 1)}
                    >
                        <HiChevronLeft />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomCarousel;
