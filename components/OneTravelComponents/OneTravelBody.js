import dynamic from "next/dynamic";
import { HiOutlineTicket } from "react-icons/hi";
import parse from "html-react-parser";
import { useState } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import countries from "../../lib/countries.json";

const Fslightboxes = dynamic(() => import("../GlobalComponents/FSLightbox"));
const Inputs = dynamic(() => import("./Inputs"));

const OneTravelBody = ({ travel }) => {
    const [imgtoggler, setimgtoggler] = useState({
        toggler: false,
        slide: 0,
    });

    return (
        <>
            <div className="max-w-7xl mt-32 pt-40 mx-auto prose px-3 2xl:px-0">
                {parse(travel.desc || "")}
                <span className={`fi fi-${countries.countries[travel.country]} w-28 h-28`} />
                {travel.country && (
                    <img
                        src={`/img/svgs/countries/${countries.countries[travel.country]}.svg`}
                        alt="Countries icon"
                        title={travel.country}
                        className="h-24 mx-auto hover:opacity-90 duration-300 shadow-md"
                    />
                )}
                {travel?.pictures?.length > 0 && (
                    <div className={`my-16 pb-16 grid grid-flow-col gap-3`}>
                        {travel.pictures?.slice(1).map((pict, index) => (
                            <img
                                onClick={() => {
                                    setimgtoggler({ toggler: !imgtoggler.toggler, slide: index + 1 });
                                }}
                                key={pict.title}
                                alt={"Utazás kép " + (Number(index) + 1)}
                                className="w-full h-full rounded-lg max-w-md mx-auto object-cover duration-300 cursor-pointer hover:opacity-90 shadow-md"
                                src={pict.src}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="px-3 2xl:px-0">
                <div className="flex flex-wrap justify-center my-12 pb-10 gap-5">
                    <div className="inline-block">
                        <div
                            onClick={() => {
                                window.open(
                                    `https://www.facebook.com/sharer/sharer.php?u=${`https://kalandozas.hu/travel/${travel.id}`}`,
                                    "facebook-share-dialog",
                                    "width=800,height=600"
                                );
                            }}
                            className="duration-300 hover:opacity-100 opacity-90 rounded-md font-semibold cursor-pointer shadow-md py-1 px-2 text-white flex w-full items-center"
                            style={{ background: "#3b5998" }}
                        >
                            <FaFacebookF />
                            <span className="px-1 ">Megosztás</span>
                        </div>
                    </div>
                    <div className="inline-block">
                        <div
                            onClick={() => {
                                window.open(
                                    `https://twitter.com/intent/tweet?url=${`https://kalandozas.hu/travel/${travel.id}`}`,
                                    "twitter-share-dialog",
                                    "width=800,height=600"
                                );
                            }}
                            className="duration-300 hover:opacity-100 opacity-90 rounded-md font-semibold cursor-pointer shadow-md py-1 px-2 text-white flex w-full items-center"
                            style={{ background: "#1DA1F2" }}
                        >
                            <FaTwitter />
                            <span className="px-1 ">Tweet</span>
                        </div>
                    </div>
                </div>
                <p className="text-2xl text-center mb-5">
                    <HiOutlineTicket fontSize="2.5rem" className="inline text-yellow-700" /> Jegyfoglalás{" "}
                    <HiOutlineTicket fontSize="2.5rem" className="inline text-yellow-700" />
                </p>
                {travel.freePlaces !== 0 && new Date() < new Date(travel.startingDate) && (
                    <p className="text-lg text-center mb-10 text-gray-700 hidden">
                        Még <span className="font-semibold">{travel.freePlaces}</span> hely foglalható!
                    </p>
                )}

                <Inputs travel={travel} />
            </div>
            <Fslightboxes setimgtoggler={setimgtoggler} imgtoggler={imgtoggler} data={travel.pictures} />
        </>
    );
};

export default OneTravelBody;
