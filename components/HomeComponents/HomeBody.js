import dynamic from "next/dynamic";
import React from "react";
import Faqs from "./Faqs";
import InfoSections from "./InfoSections";
import Streak from "./Streak";
import Cards from "./Cards";
import Loading from "../GlobalComponents/Loading";
import { sortAndGroupData } from "../../lib/helpers/travels";

const Newsletter = dynamic(() => import("./Newsletter"), {
    loading: () => <Loading />,
    ssr: false,
});

const Gallery = dynamic(() => import("../GlobalComponents/Gallery"), {
    loading: () => <Loading />,
    ssr: false,
});

const HomeBody = ({ questionsAnswers, travels }) => {
    return (
        <>
            <Newsletter />
            <Cards sortedTravels={sortAndGroupData(travels)} travels={travels} />
            <Gallery />
            <Streak />
            <InfoSections />
            <Faqs questionsAnswers={questionsAnswers} />
        </>
    );
};

export default HomeBody;
