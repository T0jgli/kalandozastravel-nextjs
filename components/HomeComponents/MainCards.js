import React from "react";

const MainCards = ({ travels, setModalOpen, carousel }) => {
    return (
        <>
            <div className={`${carousel ? "hidden xl:block" : "block xl:hidden"}`}>
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
                        className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "250px", height: "250px", maxWidth: "calc(100vw - 50px)" }}
                        onClick={() =>
                            setModalOpen({
                                open: true,
                                title: "2022-es utazásaink",
                                travels: travels.filter((travel) => travel?.startingDate?.startsWith("2022")),
                            })
                        }
                    >
                        <img
                            src={
                                "https://previews.123rf.com/images/mariusz_prusaczyk/mariusz_prusaczyk1704/mariusz_prusaczyk170400301/75727162-3d-new-year-2022-on-white-background.jpg"
                            }
                            className="absolute top-0 w-full h-full brightness-95 filter object-cover duration-300 hover:scale-110 transform object-center"
                            alt="Vízen háttér"
                        />
                        <h2
                            className="bottom-2 absolute text-white text-2xl left-1/2"
                            style={{ transform: "translateX(-50%)", textShadow: "2px 2px #000" }}
                        >
                            2022
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
        </>
    );
};

export default MainCards;
