import React, { useState } from "react";
import { HiChevronUp } from "react-icons/hi";
import parse from "html-react-parser";

const Faq = ({ question, answer }) => {
    const [click, setClick] = useState(false);

    return (
        <>
            <div className="text-lg flex- md:w-6/12 w-full text-gray-800 border-b-2 px-8 border-gray-200 py-10 font-medium">
                <div className="flex items-center cursor-pointer duration-300 hover:opacity-80" onClick={() => setClick(!click)}>
                    <p className="flex-1">{question}</p>
                    <HiChevronUp
                        fontSize="1.75rem"
                        className={`text-yellow-700 duration-300 hover:opacity-80 transform float-right ${click ? "" : "rotate-180"}`}
                    />
                </div>
                <div
                    className={`text-sm font-normal prose leading-6  overflow-hidden duration-300 ${
                        click ? "h-full pt-5 opacity-1" : "h-0 opacity-0"
                    }`}
                >
                    {parse(answer || "")}
                </div>
            </div>
        </>
    );
};

export default Faq;
