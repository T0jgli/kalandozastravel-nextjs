import dynamic from "next/dynamic";
import React from "react";
import Faqs from "./Faqs";
import InfoSections from "./InfoSections";
import Streak from "./Streak";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
const Gallery = dynamic(() => import("../GlobalComponents/Gallery"));

const HomeBody = ({ questionsAnswers, travels, months }) => {
    return (
        <>
            <Newsletter />
            <Cards travels={travels} months={months} />
            <Gallery />
            <Streak />
            <InfoSections />
            <Faqs questionsAnswers={questionsAnswers} />
        </>
    );
};

export default HomeBody;
