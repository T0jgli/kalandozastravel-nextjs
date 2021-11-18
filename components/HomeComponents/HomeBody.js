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
            <div className="mx-auto w-full flex justify-center items-center flex-col">
                <img src="/img/blackfriday.png" className="object-contain h-40 duration-300 hover:opacity-90" />
                <p className="font-black text-4xl pt-5" style={{ textShadow: "0px 0px 2px rgba(0,0,0,0.6)" }}>
                    11.19-21.
                </p>
                <p className="py-5 text-lg font-semibold gradient">
                    Az általunk szervezett utazások akciós árából 10% kedvezmény, ha 11.19-21 között elküldi foglalását.
                </p>
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
