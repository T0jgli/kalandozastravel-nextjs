import React, { useEffect, useState } from "react";
import { HiCheck, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import Modal from "./Modal";

const CustomCarousel = ({ travels }) => {
    const [active, setActive] = useState(1);

    useEffect(() => {
        const timeoutSlide = () => {
            setActive((prev) => (prev === 18 ? 1 : prev + 1));
        };

        setInterval(timeoutSlide, 5000);
        return clearInterval(timeoutSlide);
    }, []);
    const [modalOpen, setModalOpen] = useState({
        open: false,
    });

    return (
        <>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />

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

                    <div className="hidden xl:block">
                            <div className="grid xl:grid-cols-5 gap-8 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 max-w-7xl h-full mx-auto mt-20 mb-16 px-3 2xl:px-0">
                                <figure
                                    className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                                    style={{ width: "250px", height: "250px", maxWidth: "calc(100vw - 50px)" }}
                                    onClick={() =>
                                        setModalOpen({
                                            open: true,
                                            title: "Földön",
                                            travels: travels,
                                        })
                                    }
                                >
                                    <img
                                        src={"/img/busz.png"}
                                        className="absolute top-0 w-full h-full brightness-95 filter object-cover duration-300 hover:scale-110 transform object-center"
                                        alt="Földön háttér"
                                    />
                                    <h2
                                        className="bottom-2 absolute text-white text-2xl left-1/2"
                                        style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                                        alt="Földön háttér"
                                    >
                                        Földön
                                    </h2>
                                </figure>
                                <figure
                                    className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                                    style={{ width: "250px", height: "250px", maxWidth: "calc(100vw - 50px)" }}
                                    onClick={() =>
                                        setModalOpen({
                                            open: true,
                                            title: "Vízen",
                                            travels: travels.filter((travel) => travel.type?.includes("vizen")),
                                        })
                                    }
                                >
                                    <img
                                        src={"/img/hajo.jpg"}
                                        className="absolute top-0 w-full h-full brightness-95 filter object-cover duration-300 hover:scale-110 transform object-center"
                                        alt="Vízen háttér"
                                    />
                                    <h2
                                        className="bottom-2 absolute text-white text-2xl left-1/2"
                                        style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                                    >
                                        Vízen
                                    </h2>
                                </figure>
                                <figure
                                    className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                                    style={{ width: "250px", height: "250px", maxWidth: "calc(100vw - 50px)" }}
                                    onClick={() =>
                                        setModalOpen({
                                            open: true,
                                            title: "Levegőben",
                                            travels: travels.filter((travel) => travel.type?.includes("levegoben")),
                                        })
                                    }
                                >
                                    <img
                                        src={"/img/levego.jpg"}
                                        className="absolute top-0 w-full h-full brightness-95 filter object-cover duration-300 hover:scale-110 transform object-left"
                                        alt="Levegőben háttér"
                                    />
                                    <h2
                                        className="bottom-2 absolute text-white text-2xl left-1/2"
                                        style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                                    >
                                        Levegőben
                                    </h2>
                                </figure>
                                <figure
                                    className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl"
                                    style={{ width: "250px", height: "250px", maxWidth: "calc(100vw - 50px)" }}
                                    onClick={() =>
                                        setModalOpen({
                                            open: true,
                                            title: "Belföldi utazásaink",
                                            travels: travels.filter((travel) => travel?.country === "Magyarország"),
                                        })
                                    }
                                >
                                    <img
                                        src={"/img/belfold.jpg"}
                                        className="w-full h-full object-cover duration-300 hover:scale-110 brightness-95 filter transform object-center"
                                        alt="Belföld háttér"
                                    />
                                    <h2
                                        className="w-full text-center bottom-2 absolute text-white text-2xl left-1/2"
                                        style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                                    >
                                        Belföldi utazásaink
                                    </h2>
                                </figure>

                                <figure
                                    className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl"
                                    style={{ width: "250px", height: "250px", maxWidth: "calc(100vw - 50px)" }}
                                    onClick={() =>
                                        setModalOpen({
                                            open: true,
                                            title: "Külföldi utazásaink",
                                            travels: travels.filter((travel) => travel?.country !== "Magyarország"),
                                        })
                                    }
                                >
                                    <img
                                        src={"/img/kulfold.jpg"}
                                        className="w-full h-full object-cover duration-300 brightness-95 filter hover:scale-110 transform object-center"
                                        alt="Külföld háttér"
                                    />
                                    <h2
                                        className="w-full text-center bottom-2 absolute text-white text-2xl left-1/2"
                                        style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                                    >
                                        Külföldi utazásaink
                                    </h2>
                                </figure>
                            </div>
                    </div>
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
