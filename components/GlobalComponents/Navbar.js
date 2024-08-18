import React, { useEffect, useState } from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/router";
import Link from "next/link";
import useScreenWidth from "../../lib/hooks/useScreenWidth";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { clsx } from "clsx/lite";

const Navbar = () => {
    const [open, setisOpen] = useState(false);
    const [isMobile] = useScreenWidth(1023);
    const router = useRouter();
    const [navbarbg, setnavbarbg] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 1023) {
            setisOpen(false);
        }
    }, [router.pathname]);

    useEffect(() => {
        if (typeof window !== undefined) {
            const navbarScroll = () => {
                if (window.scrollY >= 75 && !isMobile && window.innerWidth >= 1023) {
                    setnavbarbg(true);
                } else {
                    setnavbarbg(false);
                }
            };
            window.addEventListener("scroll", navbarScroll);

            return () => window.removeEventListener("scroll", navbarScroll);
        }
    }, []);

    return (
        <>
            <nav
                className={clsx(
                    "sticky w-full top-0 duration-300 ease-in-out shadow-md font-semibold uppercase z-20 bg-white",
                    navbarbg ? "h-16" : "h-20"
                )}
            >
                <img
                    loading="lazy"
                    src="/img/fejsor1.webp"
                    alt="Fejsor 1 kép"
                    className={clsx(
                        "inline lg:hidden xl:inline h-10 top-5 md:top-0 m-0 absolute left-0 pr-10 duration-300",
                        navbarbg ? "md:h-16" : "md:h-20"
                    )}
                />
                <div
                    className={clsx(
                        "hidden xl:flex gap-7 items-center justify-center h-10 top-5 md:top-0 m-0 absolute right-0 duration-300 pr-10 transform",
                        navbarbg ? "md:h-16" : "md:h-20"
                    )}
                >
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.facebook.com/Neoline-Kalandoz%C3%A1s-Utaz%C3%A1si-Iroda-184037444980315"
                        className="duration-300 hover:opacity-80"
                        aria-label="Facebook oldal"
                        title="Facebook"
                    >
                        {/* <img loading="lazy" src="/img/svgs/fb.svg" width="30px" alt="Facebook ikon" /> */}
                        <FaFacebook size="2rem" />
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/kalandozas/"
                        className="duration-300 hover:opacity-80"
                        aria-label="Instagram oldal"
                        title="Instagram"
                    >
                        {/* <img loading="lazy" src="/img/svgs/insta.svg" width="30px" alt="Instagram ikon" /> */}
                        <FaInstagram size="2rem" />
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.youtube.com/channel/UCCCKnOOaQx-nmAT9YYov6xg"
                        className="duration-300 hover:opacity-80"
                        aria-label="Youtube csatorna"
                        title="Youtube"
                    >
                        {/* <img loading="lazy" src="/img/svgs/youtube.svg" width="30px" alt="Youtube ikon" /> */}
                        <FaYoutube size="2rem" />
                    </a>
                </div>
                {!isMobile && (
                    <ul className="max-w-7xl mx-auto items-center justify-center lg:flex h-full hidden list-none">
                        <li className="flex items-center justify-center">
                            <Link
                                className={clsx(
                                    "px-4 hover:text-yellow-700 filterlink duration-300",
                                    router.pathname === "/" || "" ? "active text-yellow-700" : ""
                                )}
                                href="/"
                            >
                                Főoldal
                            </Link>
                        </li>
                        <li className="flex items-center justify-center">
                            <Link
                                className={clsx(
                                    "px-4 hover:text-yellow-700 filterlink duration-300",
                                    router.pathname === "/travels" && "active text-yellow-700"
                                )}
                                href="/travels"
                            >
                                Utazásaink
                            </Link>
                        </li>

                        <li className="flex items-center justify-center">
                            <Link
                                className={clsx(
                                    "px-4 hover:text-yellow-700 filterlink duration-300",
                                    router.pathname === "/contact" && "active text-yellow-700"
                                )}
                                href="/contact"
                            >
                                Kapcsolat
                            </Link>
                        </li>
                        <li className="flex items-center justify-center">
                            <a
                                className="px-4 hover:text-yellow-700 filterlink duration-300"
                                href="http://contibus.hu"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Buszrendelés
                            </a>
                        </li>
                    </ul>
                )}
                <div
                    onClick={() => setisOpen((b) => !b)}
                    className="lg:hidden absolute bottom-5 right-10 cursor-pointer duration-300 hover:text-gray-700"
                    id="mobileicon"
                >
                    <HiMenu fontSize="2rem" className="h-10" />
                </div>
            </nav>
            {isMobile && (
                <aside
                    className={clsx(
                        "fixed font-semibold z-50 w-1/2 shadow-lg h-full grid bg-white items-center text-black duration-500 ease-in-out top-0",
                        open ? "opacity-100 right-0" : "opacity-0 -right-full"
                    )}
                >
                    <div
                        onClick={() => setisOpen((b) => !b)}
                        className="absolute top-5 right-6 cursor-pointer duration-300 hover:text-yellow-700"
                        id="mobileicon_mobile"
                    >
                        <HiOutlineX fontSize="2rem" className="h-10" />
                    </div>
                    <div>
                        <ul className="list-none p-0 m-0 grid grid-cols-1 grid-rows-3 uppercase">
                            <li className="h-20">
                                <Link
                                    className={clsx(
                                        "flex items-center justify-center cursor-pointer hover:text-yellow-700 duration-300",
                                        router.pathname === "/" || "" ? "text-yellow-700" : "text-black"
                                    )}
                                    href="/"
                                >
                                    Főoldal
                                </Link>
                            </li>
                            <li className="h-20">
                                <Link
                                    className={clsx(
                                        "flex items-center justify-center cursor-pointer hover:text-yellow-700 duration-300",
                                        router.pathname === "/travels" ? "text-yellow-700" : "text-black"
                                    )}
                                    href="/travels"
                                >
                                    Utazásaink
                                </Link>
                            </li>
                            <li className="h-20">
                                <Link
                                    className={clsx(
                                        "flex items-center justify-center cursor-pointer hover:text-yellow-700 duration-300",
                                        router.pathname === "/contact" ? "text-yellow-700" : "text-black"
                                    )}
                                    href="/contact"
                                >
                                    Kapcsolat
                                </Link>
                            </li>
                            <li className="h-20">
                                <a
                                    className="flex items-center justify-center cursor-pointer hover:text-yellow-700 duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="http://contibus.hu"
                                >
                                    Buszrendelés
                                </a>
                            </li>
                        </ul>
                        <div className="flex flex-wrap gap-7 border-t-2 border-black border-opacity-10 pt-16 items-center justify-center h-10 md:h-20 m-0 duration-300 transform">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.facebook.com/Neoline-Kalandoz%C3%A1s-Utaz%C3%A1si-Iroda-184037444980315"
                                className="duration-300 hover:opacity-80"
                                aria-label="Facebook oldal"
                                title="Facebook"
                            >
                                {/* <img loading="lazy" src="/img/svgs/fb.svg" width="30px" alt="Facebook ikon" /> */}
                                <FaFacebook size="2rem" />
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.instagram.com/kalandozas/"
                                className="duration-300 hover:opacity-80"
                                aria-label="Instagram oldal"
                                title="Instagram"
                            >
                                {/* <img loading="lazy" src="/img/svgs/insta.svg" width="30px" alt="Instagram ikon" /> */}
                                <FaInstagram size="2rem" />
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.youtube.com/channel/UCCCKnOOaQx-nmAT9YYov6xg"
                                className="duration-300 hover:opacity-80"
                                aria-label="Youtube csatorna"
                                title="Youtube"
                            >
                                {/* <img loading="lazy" src="/img/svgs/youtube.svg" width="30px" alt="Youtube ikon" /> */}
                                <FaYoutube size="2rem" />
                            </a>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
};

export default Navbar;
