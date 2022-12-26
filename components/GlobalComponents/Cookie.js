import React, { useEffect, useState } from "react";

const Cookie = () => {
    const [show, setshow] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("EnableCookies") !== "true") {
            setTimeout(() => {
                setshow(true);
            }, 750);
        }
    }, []);

    return (
        <div
            className={`${
                show ? "opacity-1 bottom-0" : "-bottom-full opacity-0"
            } fixed left-0 w-full z-40 shadow-sm bg-opacity-80 bg-black text-white ease-in-out duration-500`}
            id="cookiealert"
        >
            <div className="max-width-7xl flex flex-col md:flex-row justify-center items-center text-center p-2">
                <p className="mt-2 md:mt-0">
                    🍪 Az oldal sütiket használ a felhasználói élmény fokozása céljából. A weblap további böngészésével elfogadja az{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="/files/adatvedelmi-tajekoztato.pdf"
                        className="text-gray-400 font-medium cursor-pointer duration-300 hover:opacity-80"
                    >
                        adatvédelmi tájékoztatót
                    </a>
                    .
                </p>

                <button
                    onClick={() => {
                        setshow(false);
                        localStorage.setItem("EnableCookies", "true");
                    }}
                    className="leading-6 duration-300 hover:bg-yellow-700 hover:text-white focus:outline-none mt-4 md:mt-0 md:ml-5 text-yellow-700 
                    font-semibold text-sm uppercase border-yellow-700 border-2 rounded-full py-2 px-5"
                    id="acceptcookies"
                >
                    Rendben
                </button>
            </div>
        </div>
    );
};

export default Cookie;
