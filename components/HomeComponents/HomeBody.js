import dynamic from "next/dynamic";
import React from "react";
import Faqs from "./Faqs";
import InfoSections from "./InfoSections";
import Streak from "./Streak";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
const Gallery = dynamic(() => import("../GlobalComponents/Gallery"));

const HomeBody = ({ questionsAnswers, travels }) => {
    return (
        <>
            <div className="mx-auto max-w-6xl">
                <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-600 px-4 py-3 shadow-md  mx-5" role="alert">
                    <div className="flex">
                        <div>
                            <svg className="fill-current h-6 w-6 text-red-600-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div className="w-full">
                            <p className="font-semibold">
                                Ünnepi nyitva tartás: <br /> december 23. december 24. december 31. Irodánk zárva tart. <br />
                                <br />{" "}
                                <span className="text-center w-full block">
                                    Többi napokon a szokásos nyitva tartással várjuk Önöket. <br />H P 9 - 17 óráig.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Cards travels={travels} />
            <Newsletter />
            <Gallery />
            <Streak />
            <InfoSections />
            <Faqs questionsAnswers={questionsAnswers} />
        </>
    );
};

export default HomeBody;
