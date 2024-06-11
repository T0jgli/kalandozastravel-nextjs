import { clsx } from "clsx/lite";
import React, { useEffect, useState } from "react";

const Cookie = () => {
    const [show, setshow] = useState(false);

    function addGtag() {
        if (process?.env.NODE_ENV === "production") {
            const script = document.createElement("script");
            script.src = `https://www.googletagmanager.com/gtag/js?id=${process?.env.NEXT_PUBLIC_GOOGLE_GAID}`;
            script.setAttribute("rel", "preconnect");
            document?.head.appendChild(script);
            const gtag = document.createElement("script");
            gtag.textContent = `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'update', {
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                ad_storage: 'denied',
                analytics_storage: 'granted'
            });            
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_GAID}', {
                page_path: window.location.pathname,
            });`;
            document?.head.appendChild(gtag);
        }
    }

    useEffect(() => {
        "use client";
        if (localStorage.getItem("EnableCookies") !== "true") {
            setTimeout(() => {
                setshow(true);
            }, 750);
        } else {
            addGtag();
        }
    }, []);

    return (
        <div
            className={clsx(
                "fixed left-0 w-full z-40 shadow-sm bg-opacity-80 bg-black text-white ease-in-out duration-500",
                show ? "opacity-1 bottom-0" : "-bottom-full opacity-0"
            )}
            id="cookiealert"
        >
            <div className="max-width-7xl flex flex-col md:flex-row justify-center items-center text-center p-2">
                <p className="mt-2 md:mt-0">
                    🍪 Az oldal sütiket használ a felhasználói élmény fokozása céljából. Az elfogadom gombra kattintva elfogadja az{" "}
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
                        addGtag();
                    }}
                    className="leading-6 duration-300 hover:bg-yellow-700 hover:text-white focus:outline-none mt-4 md:mt-0 md:ml-5 text-yellow-700 
                    font-semibold text-sm uppercase border-yellow-700 border-2 rounded-full py-2 px-5"
                    id="acceptcookies"
                >
                    Elfogadom
                </button>
            </div>
        </div>
    );
};

export default Cookie;
