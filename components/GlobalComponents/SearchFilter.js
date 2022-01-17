import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineLocationMarker, HiOutlineX, HiOutlineFastForward } from "react-icons/hi";
import countries from "../../lib/countries.json";

const SearchFilter = ({ topbg }) => {
    const router = useRouter();

    const [state, setstate] = useState({
        country: router.query.country || "",
        startingDate: router.query.startingDate || "",
        title: router.query.title || "",
    });

    const formSubmit = (e) => {
        e.preventDefault();
        router.push({
            pathname: "/travels",
            query: Object.fromEntries(Object.entries(state).filter(([_, value]) => value !== "")),
        });
    };

    const inputChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <form className={`flex md:flex-row flex-col max-w-7xl px-3 2xl:px-0 justify-center items-center gap-4 my-16 mx-auto`} onSubmit={formSubmit}>
            <div className="w-full mb-10 md:mb-0">
                <div className="relative inline-block w-full text-gray-700">
                    <label className={`absolute -top-7 ${!topbg ? "text-gray-700" : "text-white"} text-sm font-semibold mb-2`} htmlFor="title">
                        Utazás neve
                    </label>
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                        <HiOutlineFastForward />
                    </div>

                    <input
                        className="w-full px-8 h-10 text-base placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                        name="title"
                        type="text"
                        id="title"
                        onChange={inputChange}
                        value={state.title}
                    />
                    {state.title !== "" && (
                        <div
                            className="absolute inset-y-0 right-1 flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                            onClick={() => setstate({ ...state, title: "" })}
                        >
                            <HiOutlineX />
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full mb-10 md:mb-0">
                <div className="relative inline-block w-full text-gray-700">
                    <label className={`absolute -top-7 ${!topbg ? "text-gray-700" : "text-white"} text-sm font-semibold mb-2`} htmlFor="country">
                        Ország
                    </label>

                    <select
                        id="country"
                        name="country"
                        className="w-full h-10 px-8 text-base placeholder-gray-600 border rounded-lg appearance-none focus:outline-none"
                        placeholder="Regular input"
                        onChange={inputChange}
                        value={state.country}
                    >
                        <option default value={""}></option>
                        {Object.keys(countries?.countries)?.map((country) => (
                            <option value={country} key={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                        <HiOutlineLocationMarker />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="relative inline-block w-full text-gray-700">
                    <label className={`absolute -top-7 ${!topbg ? "text-gray-700" : "text-white"} text-sm font-semibold mb-2`} htmlFor="startingDate">
                        Indulás dátuma
                    </label>

                    <input
                        className="w-full h-10 pl-4 pr-2 text-base placeholder-gray-600 placeholder-opacity-75 border rounded-lg appearance-none focus:outline-none"
                        name="startingDate"
                        type={"month"}
                        placeholder="év, hónap"
                        id="startingDate"
                        onChange={inputChange}
                        value={state.startingDate}
                    />
                    {state.startingDate !== "" && (
                        <div
                            className="absolute inset-y-0 right-10 flex items-center px-2 cursor-pointer duration-300 hover:opacity-80"
                            onClick={() => setstate({ ...state, startingDate: "" })}
                        >
                            <HiOutlineX />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="bg-yellow-700 border-none p-5 text-white border-2 duration-300 hover:bg-yellow-800 hover:shadow-lg focus:outline-none"
                >
                    Keresés
                </button>
            </div>
        </form>
    );
};

export default SearchFilter;
