import React from "react";

const MainCards = ({ travels, setModalOpen, carousel }) => {
    return (
        <>
            <div className={`${carousel ? "hidden xl:block" : "block xl:hidden"}`}>
                <div className="grid xl:grid-cols-5 gap-6 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 max-w-7xl mx-auto my-6 px-3 2xl:px-0">
                    <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
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
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Külföldi utazásaink
                        </h2>
                    </figure>
                    <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
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
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Belföldi utazásaink
                        </h2>
                    </figure>
                    {/* <figure
                        className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                        onClick={() =>
                            setModalOpen({
                                open: true,
                                title: "2024",
                                travels: travels.filter((travel) => travel.startingDate.startsWith("2024")),
                            })
                        }
                    >
                        <img
                            src={"/img/2024.png"}
                            className="absolute top-0 w-full h-full brightness-95 filter object-cover duration-300 hover:scale-110 transform object-center"
                            alt="2024 háttér"
                        />
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            2024
                        </h2>
                    </figure> */}

                    <figure
                        className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
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
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Levegőben
                        </h2>
                    </figure>
                    <figure
                        className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
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
                            className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2"
                            style={{ textShadow: "2px 2px #000" }}
                            alt="Vízen háttér"
                        >
                            Vízen
                        </h2>
                    </figure>
                    {/* <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl hidden xl:block xl:invisible"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                    ></figure>
                    <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl hidden xl:block xl:invisible"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                    ></figure>
                    <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl hidden xl:block xl:invisible"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                    ></figure> */}

                    <figure
                        className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
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
                            className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2"
                            style={{ textShadow: "2px 2px #000" }}
                            alt="Földön háttér"
                        >
                            Földön
                        </h2>
                    </figure>

                    {/* <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                        onClick={() => {
                            setBusjetModal({
                                open: true,
                            });
                        }}
                    >
                        <img
                            src={"/img/berlin/busz.jpeg"}
                            className="w-full h-full object-cover duration-300 brightness-95 filter hover:scale-110 transform object-center"
                            alt="Külföld háttér"
                        />
                        <h2 className="bottom-0 absolute text-white text-xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Autóbuszjegyek
                        </h2>
                    </figure>

                    <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                        onClick={() => {
                            setHotelsModal({
                                open: true,
                            });
                        }}
                    >
                        <img
                            src={"/img/berlin/berlin.jpg"}
                            className="w-full h-full object-cover duration-300 brightness-95 filter hover:scale-110 transform object-center"
                            alt="Külföld háttér"
                        />
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Európai szállások
                        </h2>
                    </figure> */}

                    {/* <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl hidden xl:block xl:invisible"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                    ></figure> */}
                </div>
            </div>
        </>
    );
};

export default MainCards;
