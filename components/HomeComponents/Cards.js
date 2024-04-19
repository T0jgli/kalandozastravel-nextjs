import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useScreenWidth from "../../lib/hooks/useScreenWidth";
import { cardAnimation } from "../GlobalComponents/Transitions";
import AllCards from "../TravelsComponents/AllCards";
import MainCards from "./MainCards";
import Modal from "./Modal";
// import ModalBusJet from "./ModalBusJet";
import ModalHatartalanul from "./ModalHatartalanul";
// import ModalHotels from "./ModalHotels";
import ModalCourier from "./ModalCourier";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import Loading from "../GlobalComponents/Loading";

const DynamicAllCards = dynamic(() => import("../TravelsComponents/AllCards"), {
    loading: () => <Loading />,
});

const DynamicModal = dynamic(() => import("./Modal"), {
    loading: () => <Loading />,
});

const DynamicModalCourier = dynamic(() => import("./ModalCourier"), {
    loading: () => <Loading />,
});

const DynamicMainCards = dynamic(() => import("./MainCards"), {
    loading: () => <Loading />,
});

const Cards = ({ travels }) => {
    const travelsdiv = useRef(null);
    const router = useRouter();
    const [travelsState, settravelsState] = useState(travels);
    const [activeYear, setActiveYear] = useState(parseInt(router.query?.year) || new Date().getFullYear());

    const [isMobile] = useScreenWidth(1280);
    const [modalOpen, setModalOpen] = useState({
        open: false,
    });

    const [courierModal, setcourierModal] = useState({
        open: false,
    });

    useEffect(() => {
        setActiveYear(parseInt(router.query?.year) || new Date().getFullYear());
    }, [router.query]);

    // useEffect(() => {
    //     settravelsState(travels.filter((travel) => travel.startingDate.startsWith(activeYear)));
    // }, [activeYear]);

    return (
        <>
            <DynamicModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            {/* <ModalHotels hotelsModal={hotelsModal} setHotelsModal={setHotelsModal} /> */}
            {/* <ModalHatartalanul hatartalanulModals={hatartalanulModals} sethatartalanulModals={sethatartalanulModals} /> */}
            {/* <ModalBusJet setBusjetModal={setBusjetModal} busjetModal={busjetModal} /> */}
            <DynamicModalCourier setmodalCourier={setcourierModal} modalCourier={courierModal} />

            {isMobile && <DynamicMainCards travels={travels} setModalOpen={setModalOpen} />}

            {/*<div className="flex justify-center my-8 pt-4 mx-auto">
                <button
                    className={`${
                        activeYear === 2023 ? "bg-gray-500 text-white cursor-default" : "bg-gray-300 text-gray-800"
                    } hover:bg-gray-400 font-bold py-2 px-4 rounded-l-md duration-300`}
                    onClick={() => {
                        router.replace(
                            {
                                query: { year: "2023" },
                            },
                            undefined,
                            {
                                shallow: true,
                            }
                        );
                    }}
                >
                    2023
                </button>
                <button
                    className={`${
                        activeYear === 2024 ? "bg-gray-500 text-white cursor-default" : "bg-gray-300 text-gray-800"
                    } hover:bg-gray-400  font-bold py-2 px-4 rounded-r-md duration-300`}
                    onClick={() => {
                        router.replace(
                            {
                                query: { year: "2024" },
                            },
                            undefined,
                            {
                                shallow: true,
                            }
                        );
                    }}
                >
                    2024
                </button>
            </div>*/}

            <div className="flex flex-col max-w-7xl mx-auto">
                <div className="my-5 flex flex-wrap items-stretch justify-items-center" ref={travelsdiv}>
                    <AnimatePresence>
                        {travelsState?.map((travel) => (
                            <motion.div
                                id="card"
                                className="xl:w-1/4 w-full sm:w-2/4 lg:w-1/3 p-5 self-stretch h-full"
                                key={travel.id}
                                initial="initial"
                                exit="exit"
                                animate="animate"
                                variants={cardAnimation}
                            >
                                <DynamicAllCards
                                    id={travel.id}
                                    thumbnail={travel.thumbnail}
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
                                    customUrl={travel.customUrl}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex justify-center gap-10 my-20 items-center">
                {/* <figure
                    className="relative overflow-hidden cursor-pointer rounded-2xl duration-300 hover:shadow-xl"
                    style={{ width: "170px", height: "170px", maxWidth: "calc(100vw - 50px)" }}
                >
                    <Link href={`/travels?offer=abroad`} className="absolute w-full h-full top-0" passHref>
                        <img
                            src={"https://backend.aleph.hu/travelmax/public_html/images/korutazasokcom/menup/tobbnapos%20kirandulsa%20busszal.jpg"}
                            className="w-full h-full object-cover duration-300 brightness-75 filter hover:scale-110 transform object-center"
                        />
                        <h2
                            className="w-full text-center bottom-2 absolute text-white text-lg left-1/2"
                            style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                        >
                            Több napos utazások
                        </h2>
                    </Link>
                </figure> */}
                <figure
                    className="relative overflow-hidden cursor-pointer rounded-2xl duration-300 hover:shadow-xl"
                    style={{ width: "170px", height: "170px", maxWidth: "calc(100vw - 50px)" }}
                >
                    <div className="absolute w-full h-full top-0" onClick={() => setcourierModal({ open: true })}>
                        <img
                            src={"https://cdn.kalandozas.hu/img/csomagpont.webp"}
                            alt="csomagpont"
                            loading="lazy"
                            className="w-full h-full object-cover duration-300 brightness-75 filter hover:scale-110 transform object-center"
                        />
                        <h2
                            className="w-full text-center bottom-0 pb-2 absolute text-white text-lg left-1/2"
                            style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                        >
                            Csomagpontok
                        </h2>
                    </div>
                </figure>
            </div>
        </>
    );
};

export default Cards;
