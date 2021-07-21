import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import Faqs from "./Faqs";
import InfoSections from "./InfoSections";
import Streak from "./Streak";
import Infos from "./Infos";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
const Gallery = dynamic(() => import("../GlobalComponents/Gallery"));

const HomeBody = ({ questionsAnswers, travels }) => {
    return (
        <>
            <Cards travels={travels} />
            <Newsletter />
            <Gallery />
            <Infos />
            <Streak />
            <InfoSections />
            <Faqs questionsAnswers={questionsAnswers} />
        </>
    );
};

export default HomeBody;
