import dynamic from "next/dynamic";
import { HiOutlineTicket } from "react-icons/hi";
import parse from "html-react-parser";
import { useState } from "react";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import countries from "../../lib/countries.json";
import Link from "next/link";
import Loading from "../GlobalComponents/Loading";
import { clsx } from "clsx/lite";

const TYPEPARSER = {
    "1naposutazas": "1 napos utazás",
    "1naposkulfoldi": "1 napos külföldi",
    varoslatogatas: "Városlátogatás",
    "1naposbelfoldi": "1 napos belföldi",
    levegoben: "Levegőben",
    nonstop: "Non-Stop utazás",
    korutazas: "Körutazás",
    partnerek: "Partneri utazás",
};

const Fslightboxes = dynamic(() => import("../GlobalComponents/FSLightbox"));
const Inputs = dynamic(() => import("./Inputs"), {
    ssr: false,
    loading: () => <Loading />,
});

const OneTravelBody = ({ travel }) => {
    const [imgtoggler, setimgtoggler] = useState({
        toggler: false,
        slide: 0,
    });

    const countryFromJson = Object.fromEntries(Object.entries(countries.countries).map(([k, v]) => [k?.toLowerCase()?.trim(), v]));

    return (
        <>
            <div className="max-w-7xl mt-32 pt-40 mx-auto prose px-3 2xl:px-0">
                {parse(travel?.desc || "")}
                <span className={clsx("fi w-28 h-28", `fi-${countryFromJson[travel?.country?.trim()?.toLowerCase()]}`)} />

                {travel?.country && (
                    <img
                        loading="lazy"
                        src={`/img/svgs/countries/${countryFromJson[travel?.country?.trim()?.toLowerCase()]}.svg`}
                        alt={`${countryFromJson[travel?.country?.trim()]} ikon`}
                        title={travel?.country?.trim()}
                        className="h-24 mx-auto hover:opacity-90 duration-300 shadow-md"
                        id="countryimage"
                    />
                )}
                <div className="w-full flex flex-center justify-center text-center flex-wrap mt-8">
                    {travel?.freePlaces === 0 && (
                        <span className="bg-red-600 uppercase px-4 py-2 rounded-full border border-gray-300 text-white font-semibold text-sm flex align-center w-max">
                            Megtelt
                        </span>
                    )}
                </div>

                {travel?.thumbnails?.length > 0 && (
                    <div className="my-16 pb-16 grid grid-flow-col grid-rows-2 md:grid-rows-1 gap-3" id="travelimages">
                        {travel?.thumbnails?.slice(1).map((pict, index) => (
                            <img
                                loading="lazy"
                                onClick={() => {
                                    setimgtoggler({ toggler: !imgtoggler.toggler, slide: index + 1 });
                                }}
                                key={travel?.name + " Kép" + index}
                                alt={`${travel?.title} ${Number(index) + 1}`}
                                className="w-full h-full rounded-lg max-w-md mx-auto object-cover duration-300 cursor-pointer hover:opacity-90 shadow-md"
                                src={pict}
                            />
                        ))}
                    </div>
                )}
                <div className="w-full flex flex-center justify-center text-center gap-8 flex-wrap">
                    {travel?.isSale && (
                        <span className="uppercase px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max">
                            Akció
                        </span>
                    )}
                    {travel?.type?.length > 0 &&
                        travel?.type?.map((t) => (
                            <Link
                                prefetch={false}
                                className="uppercase active:bg-gray-300 transition duration-300 ease hover:bg-gray-200 cursor-pointer px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max no-underline"
                                href={`/travels?type=${t}`}
                                key={`${t} ${travel?.id}`}
                            >
                                <span>{TYPEPARSER?.[t] || t}</span>
                            </Link>
                        ))}
                    {travel?.type2 && (
                        <span className="uppercase px-4 py-2 rounded-full border border-gray-300 text-gray-500 font-semibold text-sm flex align-center w-max">
                            {travel?.type2}
                        </span>
                    )}
                </div>
            </div>
            <div className="px-3 2xl:px-0">
                <div className="flex flex-wrap justify-center my-12 pb-10 gap-5">
                    <div className="inline-block">
                        <div
                            onClick={() => {
                                window.open(
                                    `https://www.facebook.com/sharer/sharer.php?u=${`https://kalandozas.hu/travel/${travel?.id}`}`,
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
                                    `https://twitter.com/intent/tweet?url=${`https://kalandozas.hu/travel/${travel?.id}`}`,
                                    "twitter-share-dialog",
                                    "width=800,height=600"
                                );
                            }}
                            className="duration-300 hover:opacity-100 opacity-90 rounded-md font-semibold cursor-pointer shadow-md py-1 px-2 text-white flex w-full items-center"
                            style={{ background: "#1DA1F2" }}
                        >
                            <FaXTwitter />
                            <span className="px-1 ">Bejegyzés</span>
                        </div>
                    </div>
                </div>
                <p className="text-2xl text-center mb-5">
                    <HiOutlineTicket fontSize="2.5rem" className="inline text-yellow-700" /> Jegyfoglalás{" "}
                    <HiOutlineTicket fontSize="2.5rem" className="inline text-yellow-700" />
                </p>
                {travel?.freePlaces !== 0 && new Date() < new Date(travel?.startingDate) && (
                    <p className="text-lg text-center mb-10 text-gray-700 hidden">
                        Még <span className="font-semibold">{travel?.freePlaces}</span> hely foglalható!
                    </p>
                )}

                <Inputs travel={travel} />
            </div>
            <Fslightboxes setimgtoggler={setimgtoggler} imgtoggler={imgtoggler} data={travel?.thumbnails} />
        </>
    );
};

export default OneTravelBody;
