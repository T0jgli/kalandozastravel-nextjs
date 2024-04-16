import React from "react";
import { FaFacebook } from "react-icons/fa";

const Streak = () => {
    return (
        <div
            className="bg-fixed duration-300 hover:opacity-95 shadow-lg bg-cover relative max-w-screen h-72 mb-20 md:mb-0"
            style={{ backgroundImage: "url(https://cdn.kalandozas.hu/img/tengerpart.jpg)" }}
        >
            <div className="absolute uppercase text-white text-5xl font-semibold handwriting flex justify-center items-center top-0 left-0 w-full h-full z-10 bg-black bg-opacity-40">
                <a
                    href="https://www.facebook.com/Neoline-Kalandoz%C3%A1s-Utaz%C3%A1si-Iroda-184037444980315"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="flex px-10 2xl:px-0 items-center duration-300 hover:text-yellow-700">
                        <h2 className="md:mr-10">facebook oldalunk</h2>
                        <FaFacebook fontSize="4rem" />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Streak;
