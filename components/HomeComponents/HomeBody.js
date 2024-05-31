import dynamic from "next/dynamic";
import React from "react";
import Faqs from "./Faqs";
import InfoSections from "./InfoSections";
import Streak from "./Streak";
import Cards from "./Cards";
import Loading from "../GlobalComponents/Loading";

const Newsletter = dynamic(() => import("./Newsletter"), {
    loading: () => <Loading />,
    ssr: false,
});

const Gallery = dynamic(() => import("../GlobalComponents/Gallery"), {
    loading: () => <Loading />,
    ssr: false,
});

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
