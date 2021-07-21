import dynamic from "next/dynamic";
import { HiOutlineTicket } from "react-icons/hi";
import parse from "html-react-parser";
import { useState } from "react";

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
                <div className={`my-16 pb-16 grid grid-flow-col gap-3`}>
                    {travel.pictures?.slice(1).map((pict, index) => (
                        <img
                            onClick={() => {
                                setimgtoggler({ toggler: !imgtoggler.toggler, slide: index + 1 });
                            }}
                            key={pict.title}
                            alt={"Utazás kép " + (Number(index) + 1)}
                            className="w-full h-full rounded-lg max-w-md mx-auto object-cover duration-300 cursor-pointer hover:opacity-90"
                            src={pict.src}
                        />
                    ))}
                </div>
            </div>

            <div className="px-3 2xl:px-0">
                <div id="ticket" className="h-20" />
                <p className="text-2xl text-center mb-5">
                    <HiOutlineTicket fontSize="2.5rem" className="inline text-yellow-700" /> Jegyfoglalás{" "}
                    <HiOutlineTicket fontSize="2.5rem" className="inline text-yellow-700" />
                </p>
                {travel.freePlaces !== 0 && new Date() < new Date(travel.startingDate) && (
                    <p className="text-lg text-center mb-10 text-gray-700">
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
