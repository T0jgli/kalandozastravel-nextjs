import { useRouter } from "next/router";
import React from "react";
import { HiOutlineShoppingCart, HiOutlineCalendar } from "react-icons/hi";
import Link from "next/link";
import customToLocaleDateString from "../../lib/helpers/Date";

const ModalContent = ({ travels }) => {
    const router = useRouter();

    return (
        <div>
            <table className="min-w-max mx-auto flex flex-row flex-no-wrap w-full table-auto rounded-xl" id="table">
                <thead className="rounded-xl hidden md:table-header-group">
                    <tr className="bg-gray-200 flex flex-col flex-no wrap sm:table-row text-gray-600 uppercase text-sm leading-normal">
                        <th></th>
                        <th className="px-6 py-3 text-left">Dátum</th>
                        <th className="px-6 py-3 text-left">Utazás</th>
                        <th className="px-6 py-3 text-left">Ár</th>
                        <th className="px-3 py-3 text-right">Jegyfoglalás</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm w-full font-light rounded-xl">
                    {travels?.map((travel, i) => {
                        const traveldate = new Date(travel.startingDate);
                        const date = new Date();
                        let travelLink = (
                            <Link
                                className="rounded-full p-3 cursor-pointer focus:outline-none duration-300 flex items-center justify-end"
                                href={travel.customUrl || `/travel/${travel?.id}#ticket`}
                            >
                                <HiOutlineShoppingCart fontSize="1.5rem" />
                            </Link>
                        );

                        if (travel?.freePlaces == 0) {
                            travelLink = <div className="font-medium p-3 text-red-700">Megtelt</div>;
                        } else if (new Date() >= new Date(travel?.startingDate)) {
                            travelLink = <div className="font-medium p-3 text-red-700">Lezárult</div>;
                        } else if (travel?.type2 === "Jelentkezés lezárult") {
                            travelLink = <div className="font-medium p-3 text-red-700">Lezárult</div>;
                        }

                        return (
                            <tr
                                className="border-b-2 flex flex-col flex-no wrap sm:table-row duration-300 border-gray-200 hover:bg-gray-200 rounded-xl"
                                key={i}
                            >
                                <td className="text-center md:text-left mx-auto">
                                    <img
                                        loading="lazy"
                                        src={travel.thumbnail || travel.photoURL || travel?.pictures?.[0]?.src}
                                        alt={`Utazás kép ${i}`}
                                        className="w-12 h-12 object-cover shadow-md rounded-lg"
                                    />
                                </td>
                                <td className="py-3 px-6 items-center gap-2 text-center md:text-left whitespace-nowrap ">
                                    <HiOutlineCalendar />
                                    {traveldate?.getUTCFullYear() !== date.getUTCFullYear() && <span>{traveldate?.getUTCFullYear()} </span>}

                                    {customToLocaleDateString(new Date(travel?.startingDate))}
                                    {travel?.startingDate !== travel?.endingDate && " - " + customToLocaleDateString(new Date(travel?.endingDate))}
                                </td>
                                <td className="py-3 px-6 text-left font-medium max-w-xs cursor-pointer" style={{ wordWrap: "break-word" }}>
                                    <Link
                                        prefetch={false}
                                        href={travel.customUrl || `/travel/${travel?.id}`}
                                        className="hover:text-yellow-700 break-words duration-300"
                                    >
                                        <p>{travel?.title}</p>
                                    </Link>
                                </td>
                                <td className="py-3 px-6 items-center gap-2 text-center md:text-left whitespace-nowrap ">
                                    <p>{travel?.price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} Ft</p>
                                </td>

                                <td className="py-3 px-6 whitespace-nowrap text-center md:text-right hover:text-yellow-700 z-10">{travelLink}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ModalContent;
