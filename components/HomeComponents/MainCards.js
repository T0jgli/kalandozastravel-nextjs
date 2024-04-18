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
                                title: "Belföldi buszos utazások",
                                travels: travels.filter((travel) => travel?.country === "Magyarország" && !travel?.type?.includes("levegoben")),
                            })
                        }
                    >
                        <img
                            loading="lazy"
                            src={"https://cdn.kalandozas.hu/img/belfold.jpg"}
                            className="w-full h-full object-cover duration-300 hover:scale-110 brightness-95 filter transform object-center"
                            alt="Belföld háttér"
                        />
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Belföldi buszos utazások
                        </h2>
                    </figure>
                    <figure
                        className="relative overflow-hidden cursor-pointer rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                        onClick={() =>
                            setModalOpen({
                                open: true,
                                title: "Külföldi buszos utazások",
                                travels: travels.filter((travel) => travel?.country !== "Magyarország" && !travel?.type?.includes("levegoben")),
                            })
                        }
                    >
                        <img
                            loading="lazy"
                            src={"https://cdn.kalandozas.hu/img/kulfold.jpg"}
                            className="w-full h-full object-cover duration-300 brightness-95 filter hover:scale-110 transform object-center"
                            alt="Külföld háttér"
                        />
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Külföldi buszos utazások
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
                            src={"https://cdn.kalandozas.hu/img/2024.png"}
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
                                title: "Repülős utazások",
                                travels: travels.filter((travel) => travel?.type?.includes("levegoben")),
                            })
                        }
                    >
                        <img
                            loading="lazy"
                            src={"https://cdn.kalandozas.hu/img/levego.jpg"}
                            className="absolute top-0 w-full h-full brightness-95 filter object-cover duration-300 hover:scale-110 transform object-left"
                            alt="Levegőben háttér"
                        />
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Repülős utazások
                        </h2>
                    </figure>
                    <figure
                        className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto duration-300 hover:shadow-xl"
                        style={{ width: "175px", height: "175px", maxWidth: "calc(100vw - 50px)", placeSelf: "center" }}
                        onClick={() =>
                            setModalOpen({
                                open: true,
                                title: "Egyéni szállásfoglalás",
                                travels: travels.filter((travel) => travel?.type?.includes("egyeniszallas")),
                            })
                        }
                    >
                        <img
                            loading="lazy"
                            src={"https://cdn.kalandozas.hu/img/egyeniszallas.jpg"}
                            className="absolute top-0 w-full h-full brightness-95 filter object-cover duration-300 hover:scale-110 transform object-center"
                            alt="Egyéni szállásfoglalás háttér"
                        />
                        <h2
                            className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2"
                            style={{ textShadow: "2px 2px #000" }}
                            alt="Egyéni szállásfoglalás háttér"
                        >
                            Egyéni szállásfoglalás
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
                                title: "Hajós utazások",
                                travels: travels.filter((travel) => travel?.type?.includes("vizen")),
                            })
                        }
                    >
                        <img
                            loading="lazy"
                            src={"https://cdn.kalandozas.hu/img/hajo.jpg"}
                            className="absolute top-0 w-full h-full brightness-95 filter object-cover duration-300 hover:scale-110 transform object-center"
                            alt="Hajós utazások háttér"
                        />
                        <h2 className="bottom-0 absolute text-white text-2xl left-0 text-center w-full pb-2" style={{ textShadow: "2px 2px #000" }}>
                            Hajós utazások
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
                            src={"https://cdn.kalandozas.hu/img/berlin/busz.jpeg"}
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
                            src={"https://cdn.kalandozas.hu/img/berlin/berlin.jpg"}
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
