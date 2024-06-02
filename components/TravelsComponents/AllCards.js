import React, { Suspense } from "react";
import { useRouter } from "next/router";
import { HiOutlineCalendar, HiOutlineUserGroup, HiOutlineTag } from "react-icons/hi";
import Link from "next/link";
import customToLocaleDateString from "../../lib/helpers/Date";

const AllCard = ({
    backgroundImage,
    title,
    timestamp,
    price,
    startingDate,
    endingDate,
    places,
    id,
    isSale,
    type2,
    customUrl,
    country,
    thumbnail,
}) => {
    const router = useRouter();
    const traveldate = new Date(startingDate);
    const endingTraveldate = new Date(endingDate);
    const date = new Date();
    return (
        <Suspense>
            <article
                className={`flex flex-col relative w-100 h-100 rounded-2xl duration-300 hover:shadow-2xl bg-white shadow-lg overflow-hidden ${
                    places === 0 || date >= traveldate || type2 === "Jelentkezés lezárult" ? "unavailable" : ""
                }`}
                style={{ minHeight: "400px" }}
            >
                <div
                    className="relative w-100 overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/travel/${id}`)}
                    style={{ paddingTop: "calc(52.356%)" }}
                >
                    <img
                        src={thumbnail}
                        loading="lazy"
                        alt={`Utazás kép ${title}`}
                        className="absolute top-0 w-100 h-100 object-cover duration-300 hover:scale-110 transform object-center"
                    />
                    {isSale && (
                        <span className="absolute bottom-0 p-2 right-0 font-semibold bg-red-600 text-white rounded-tl-xl rounded-bl-xl">Akció</span>
                    )}
                    {places === 0 ? (
                        <span className="absolute text-sm top-0 p-2 left-0 font-semibold uppercase bg-red-900 text-white bg-opacity-80 rounded-tr-xl rounded-br-xl">
                            Megtelt
                        </span>
                    ) : (
                        type2 && (
                            <span className="absolute text-sm top-0 p-2 left-0 font-semibold uppercase bg-gray-700 text-white bg-opacity-80 rounded-tr-xl rounded-br-xl">
                                {type2}
                            </span>
                        )
                    )}
                </div>

                <div className="p-4 lg:p-3 w-full flex flex-col">
                    <Link
                        className="hover:text-yellow-700 text-center font-semibold break-words duration-300 h-full flex justify-center items-center"
                        href={`/travel/${id}`}
                        style={{ minHeight: "48px" }}
                        prefetch={false}
                    >
                        {title}
                    </Link>

                    <div className="mx-2 mt-4 py-4 border-t-2 border-b-2 duration-300 hover:opacity-90 border-gray-100">
                        <div className="flex flex-col justify-around">
                            <div className="flex mb-3 items-center">
                                <HiOutlineCalendar fontSize="1.5rem" className="text-yellow-700" />
                                <div className="flex-col text-sm pl-5">
                                    <p>Időpont</p>
                                    <div className="opacity-70">
                                        {traveldate.getUTCFullYear() !== date.getUTCFullYear() && <span>{traveldate.getUTCFullYear()} </span>}
                                        {customToLocaleDateString(traveldate)}
                                        {startingDate !== endingDate && " - " + customToLocaleDateString(endingTraveldate)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center s">
                                <HiOutlineTag fontSize="1.5rem" className="text-yellow-700" />
                                <div className="flex-col text-sm pl-5">
                                    <p className="opacity-80">{country}</p>
                                </div>
                            </div>

                            <div className="items-center hidden">
                                <HiOutlineUserGroup fontSize="1.5rem" className="text-yellow-700" />
                                <div className="flex-col text-sm pl-5">
                                    <p>Szabad helyek</p>
                                    <p className="opacity-70">{places}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-2xl mt-4 text-center font-semibold text-gray-600 hover:opacity-80 duration-300 flex-none">
                        {price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} Ft
                    </p>
                    {/* <button
                    className="rounded-2xl p-3 bg-gray-100 absolute bottom-0 right-0 cursor-pointer focus:outline-none duration-300 hover:bg-gray-50"
                    onClick={() => router.push(`/travel/${id}#ticket`)}
                >
                    <HiOutlineShoppingCart />
                </button> */}
                </div>
            </article>
        </Suspense>
    );
};

export default AllCard;
