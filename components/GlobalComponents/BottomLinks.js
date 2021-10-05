import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BottomLinks = () => {
    const router = useRouter();
    return (
        <div className="h-auto w-full bg-white shadow" style={{ minHeight: "4rem" }}>
            <div
                className="flex flex-wrap gap-8 justify-center items-center h-auto mx-auto uppercase font-medium py-5 md:py-0"
                style={{ minHeight: "4rem" }}
            >
                <a
                    className={`hover:text-yellow-700 filterlink duration-300 h-full cursor-pointer`}
                    href="https://hunisphere-zrt.com/busjetbusinessclass/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Bus Jet Business Class
                </a>

                <Link passHref href="/travels?type=1naposutazas">
                    <a
                        className={`${
                            router.query.type === "1naposutazas" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                    >
                        1 napos utazások
                    </a>
                </Link>
                <Link passHref href="/travels?type=korutazas">
                    <a
                        className={`${
                            router.query.type === "korutazas" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                    >
                        Körutazások
                    </a>
                </Link>
                <Link passHref href="/travels?type=nonstop">
                    <a
                        className={`${
                            router.query.type === "nonstop" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                    >
                        Non-Stop utazások
                    </a>
                </Link>
                <Link passHref href="/travels?type=varoslatogatas">
                    <a
                        className={`${
                            router.query.type === "varoslatogatas" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                    >
                        Városlátogatások
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default BottomLinks;
