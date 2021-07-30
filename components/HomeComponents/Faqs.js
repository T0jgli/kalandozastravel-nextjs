import React from "react";
import Faq from "./Faq";
import galleryJSON from "../../lib/gallery.json";

const Faqs = ({ questionsAnswers }) => {
    return (
        <>
            <h2 className="text-2xl text-gray-800 font-semibold my-10 text-center">Gyakran Ismételt Kérdések</h2>
            <div className="max-w-7xl mb-10 mx-auto flex justify-center">
                <div className="flex flex-wrap items-start px-10 2xl:px-0 my-10 w-full">
                    {questionsAnswers?.map(({ question, answer, id }) => (
                        <Faq key={id} question={question} answer={answer} />
                    ))}
                </div>
            </div>
            <div className="hidden grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 grid-rows-3 overflow-hidden">
                {galleryJSON.map((gallery, i) => (
                    <div className="relative overflow-hidden w-full h-72" key={i}>
                        <img
                            src={gallery?.original}
                            alt=""
                            className="absolute top-0 left-0 transform duration-300 hover:scale-110 h-72 object-cover w-full cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Faqs;
