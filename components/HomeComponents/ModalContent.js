import { useRouter } from "next/router";
import React from "react";
import { HiOutlineShoppingCart, HiOutlineCalendar } from "react-icons/hi";

const ModalContent = ({ travels }) => {
    const router = useRouter();

    return (
        <div>
            <table className="min-w-max mx-auto flex flex-row flex-no-wrap w-full table-auto rounded-xl" id="table">
                <thead className="rounded-xl hidden md:table-header-group">
                    <tr className="bg-gray-200 flex flex-col flex-no wrap sm:table-row text-gray-600 uppercase text-sm leading-normal">
                        <th></th>
                        <th className="px-6 py-3 text-left">Dátum</th>
                        <th className="px-6 py-3 text-left">Cím</th>
                        <th className="px-6 py-3 text-right">Szabad helyek</th>
                        <th className="px-3 py-3 text-right">Jegyfoglalás</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm w-full font-light rounded-xl">
                    {travels?.map((travel, i) => (
                        <tr
                            className="border-b-2 flex flex-col flex-no wrap sm:table-row duration-300 border-gray-200 hover:bg-gray-200 cursor-pointer rounded-xl"
                            onClick={() => router.push(travel.customUrl || `/travel/${travel.id}`)}
                            key={i}
                        >
                            <td className="text-center md:text-left mx-auto">
                                <img
                                    src={travel.photoURL || travel.pictures?.[0]?.src}
                                    alt={`Utazás kép ${i}`}
                                    className="w-12 h-12 object-cover shadow-md rounded-lg"
                                />
                            </td>
                            <td className="py-3 px-6 items-center gap-2 text-center md:text-left whitespace-nowrap ">
                                <HiOutlineCalendar />
                                {new Date(travel.startingDate).toLocaleDateString("hu-HU", {
                                    month: "short",
                                    day: "numeric",
                                })}
                                {travel.startingDate !== travel.endingDate &&
                                    " - " +
                                        new Date(travel.endingDate).toLocaleDateString("hu-HU", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                            </td>
                            <td className="py-3 px-6 text-left font-medium max-w-xs" style={{ wordWrap: "break-word" }}>
                                {travel.title}
                            </td>
                            <td className="py-3 px-6 text-center md:text-right whitespace-nowrap">
                                <span className="md:hidden">Szabad helyek: </span>
                                {travel.freePlaces}
                            </td>
                            <td className="py-3 px-6 whitespace-nowrap text-center md:text-right hover:text-yellow-700">
                                <button
                                    className="rounded-full p-3 cursor-pointer focus:outline-none duration-300"
                                    onClick={() => router.push(travel.customUrl || `/travel/${travel.id}#ticket`)}
                                >
                                    <HiOutlineShoppingCart fontSize="1.5rem" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModalContent;
