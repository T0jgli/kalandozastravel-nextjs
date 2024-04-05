import React from "react";

const currentOffers = () => {
    return (
        <div className="flex items-center justify-center gap-8">
            <figure
                className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto shadow-lg duration-300 hover:shadow-xl bg-white"
                style={{ width: "250px", height: "300px", maxWidth: "calc(100vw - 50px)" }}
            >
                <div className="relative overflow-hidden" style={{ width: "250px", height: "200px" }}>
                    <img
                        loading="lazy"
                        src={"https://i.pinimg.com/originals/a8/dd/20/a8dd2059ee5d0ee3257b73b4962d5a3f.jpg"}
                        className="absolute top-0 brightness-90 w-full h-full filter object-cover duration-300 hover:scale-110 transform object-center"
                        alt="Földön háttér"
                    />
                </div>
                <a
                    className="h-full mt-3 block hover:text-yellow-700 text-center font-semibold break-words duration-300"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Budapest - Berlin <br /> Berlin - Budapest <br />
                    Business Class
                </a>
            </figure>

            <figure
                className="relative cursor-pointer overflow-hidden rounded-2xl mx-auto shadow-lg duration-300 hover:shadow-xl bg-white"
                style={{ width: "250px", height: "300px", maxWidth: "calc(100vw - 50px)" }}
            >
                <div className="relative overflow-hidden" style={{ width: "250px", height: "200px" }}>
                    <img
                        loading="lazy"
                        src={"https://i.pinimg.com/originals/a8/dd/20/a8dd2059ee5d0ee3257b73b4962d5a3f.jpg"}
                        className="absolute top-0 brightness-90 w-full h-full filter object-cover duration-300 hover:scale-110 transform object-center"
                        alt="Földön háttér"
                    />
                </div>
                <a
                    className="h-full mt-3 block hover:text-yellow-700 text-center font-semibold break-words duration-300"
                    href="https://www.facebook.com/events/635875474063222"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Inter - Real Madrid <br />
                    buszos utazás
                </a>
            </figure>
        </div>
    );
};

export default currentOffers;
