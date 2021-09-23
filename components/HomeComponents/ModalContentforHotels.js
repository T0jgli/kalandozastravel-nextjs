import React from "react";

const ModalContentforHotels = ({ hotels }) => {
    return (
        <div>
            <table className="min-w-max mx-auto flex flex-row flex-no-wrap w-full table-auto rounded-xl" id="table">
                <thead className="rounded-xl hidden md:table-header-group">
                    <tr className="bg-gray-200 flex flex-col flex-no wrap sm:table-row text-gray-600 uppercase text-sm leading-normal">
                        <th></th>
                        <th className="px-6 py-3 text-left">Cím</th>
                        <th className="px-6 py-3 text-left">Ár</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm w-full font-light rounded-xl">
                    {hotels?.map((hotel, i) => (
                        <tr
                            className="border-b-2 flex flex-col flex-no wrap sm:table-row duration-300 border-gray-200 hover:bg-gray-200 rounded-xl"
                            key={i}
                        >
                            <td className="text-center md:text-left mx-auto">
                                <img src={hotel.picture?.src} alt={`Hotel kép ${i}`} className="w-12 h-12 object-cover shadow-md rounded-lg" />
                            </td>
                            <td className="py-3 px-6 text-left font-medium max-w-xs cursor-pointer" style={{ wordWrap: "break-word" }}>
                                <a className="hover:text-yellow-700 break-words duration-300">
                                    <p>{hotel.title}</p>
                                </a>
                            </td>
                            <td className="py-3 px-6 text-left font-medium max-w-xs cursor-pointer" style={{ wordWrap: "break-word" }}>
                                <a className="break-words">
                                    <p>{hotel.price}</p>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModalContentforHotels;
