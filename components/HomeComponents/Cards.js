import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { cardAnimation } from "../GlobalComponents/Transitions";
import AllCards from "../TravelsComponents/AllCards";
import Modal from "./Modal";

const Cards = ({ travels }) => {
    const travelsdiv = useRef(null);

    const [modalOpen, setModalOpen] = useState({
        open: false,
    });

    return (
        <>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <div className="xl:hidden block">
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
                            src={"https://jooinn.com/images/aircraft-flying-13.jpg"}
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

            <div className="mx-auto mt-20 text-center font-light">
                <h3 className="text-2xl font-medium mb-10 tracking-wide">Aktuális ajánlataink</h3>
            </div>
            <div className="flex flex-col max-w-7xl mx-auto">
                <div className="my-5 flex flex-wrap items-stretch justify-items-center" ref={travelsdiv}>
                    <AnimatePresence>
                        {travels.map((travel) => (
                            <motion.div
                                id="card"
                                className="xl:w-1/4 w-full sm:w-2/4 lg:w-1/3 p-5 self-stretch h-full"
                                key={travel.id}
                                initial="initial"
                                exit="exit"
                                animate="animate"
                                variants={cardAnimation}
                            >
                                <AllCards
                                    id={travel.id}
                                    backgroundImage={travel.photoURL || travel.pictures?.[0]?.src || ""}
                                    title={travel.title}
                                    isSale={travel.isSale}
                                    country={travel.country}
                                    timestamp={travel.timestamp}
                                    startingDate={travel.startingDate}
                                    endingDate={travel.endingDate}
                                    places={travel.freePlaces}
                                    price={travel.price}
                                    type2={travel.type2}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 pb-20 pt-10 max-w-5xl mx-auto"></div>
            {/* <div className="flex justify-center gap-10 items-center">
                <figure
                    className="relative overflow-hidden cursor-pointer rounded-2xl duration-300 hover:shadow-xl"
                    style={{ width: "170px", height: "170px", maxWidth: "calc(100vw - 50px)" }}
                >
                    <Link href={`/travels?offer=abroad`} className="absolute w-full h-full top-0" passHref>
                        <a className="w-full h-full">
                            <img
                                src={"https://backend.aleph.hu/travelmax/public_html/images/tdm/menup/IMG_8972.jpg"}
                                className="w-full h-full object-cover duration-300 brightness-75 filter hover:scale-110 transform object-center"
                            />
                            <h2
                                className="w-full text-center bottom-2 absolute text-white text-lg left-1/2"
                                style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                            >
                                1 napos utazások
                            </h2>
                        </a>
                    </Link>
                </figure>
                <figure
                    className="relative overflow-hidden cursor-pointer rounded-2xl duration-300 hover:shadow-xl"
                    style={{ width: "170px", height: "170px", maxWidth: "calc(100vw - 50px)" }}
                >
                    <Link href={`/travels?offer=abroad`} className="absolute w-full h-full top-0" passHref>
                        <a className="w-full h-full">
                            <img
                                src={
                                    "https://backend.aleph.hu/travelmax/public_html/images/korutazasokcom/menup/tobbnapos%20kirandulsa%20busszal.jpg"
                                }
                                className="w-full h-full object-cover duration-300 brightness-75 filter hover:scale-110 transform object-center"
                            />
                            <h2
                                className="w-full text-center bottom-2 absolute text-white text-lg left-1/2"
                                style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                            >
                                Több napos utazások
                            </h2>
                        </a>
                    </Link>
                </figure>
            </div>
 */}
        </>
    );
};

export default Cards;
