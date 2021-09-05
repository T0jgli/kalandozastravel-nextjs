import React from "react";

const CurrentOffers = () => {
    return (
        <div className="flex flex-wrap items-center justify-center w-full my-8 px-2 md:px-0 gap-8">
            <a href="https://hunisphere-zrt.com/busjetbusinessclass/" target="_blank" rel="noopener noreferrer">
                <article
                    className="relative cursor-pointer overflow-hidden rounded-2xl shadow-lg duration-300 hover:shadow-xl bg-white"
                    style={{ width: "250px", height: "300px", maxWidth: "calc(100vw - 50px)" }}
                >
                    <div className="relative overflow-hidden" style={{ width: "250px", height: "200px" }}>
                        <img
                            src={"/img/berlin.jpg"}
                            className="absolute top-0 brightness-90 w-full h-full filter object-cover duration-300 hover:scale-110 transform object-center"
                            alt="Földön háttér"
                        />
                    </div>
                    <div className="w-full flex items-center" style={{ height: "100px" }}>
                        <p className="block w-full text-center hover:text-yellow-700 font-semibold break-words duration-300">
                            Budapest - Berlin <br /> Berlin - Budapest <br />
                            Business Class
                        </p>
                    </div>
                </article>
            </a>

            {/* <article
                className="relative cursor-pointer overflow-hidden rounded-2xl shadow-lg duration-300 hover:shadow-xl bg-white"
                style={{ width: "250px", height: "300px", maxWidth: "calc(100vw - 50px)" }}
            >
                <div className="relative overflow-hidden" style={{ width: "250px", height: "200px" }}>
                    <img
                        src={"https://pbs.twimg.com/media/Ef8Imb_WAAEb15L.jpg:large"}
                        className="absolute top-0 brightness-90 w-full h-full filter object-cover duration-300 hover:scale-110 transform object-center"
                        alt="Földön háttér"
                    />
                </div>
                <div className="w-full flex items-center" style={{ height: "100px" }}>
                    <a
                        className="block w-full text-center hover:text-yellow-700 font-semibold break-words duration-300"
                        href="https://www.facebook.com/events/635875474063222"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Inter - Real Madrid <br />
                        buszos utazás
                    </a>
                </div>
            </article> */}
        </div>
    );
};

export default CurrentOffers;
