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
                <Link
                    className={`${
                        router.query.type === "1naposutazas" ? "active text-yellow-700" : ""
                    } hover:text-yellow-700 filterlink duration-300 h-full`}
                    href="/travels?type=1naposutazas"
                >
                    1 napos utazások
                </Link>
                <Link
                    className={`${
                        router.query.type === "korutazas" ? "active text-yellow-700" : ""
                    } hover:text-yellow-700 filterlink duration-300 h-full`}
                    href="/travels?type=korutazas"
                >
                    Körutazások
                </Link>
                <Link
                    className={`${
                        router.query.type === "nonstop" ? "active text-yellow-700" : ""
                    } hover:text-yellow-700 filterlink duration-300 h-full`}
                    href="/travels?type=nonstop"
                >
                    Non-Stop utazások
                </Link>
                <Link
                    className={`${
                        router.query.type === "varoslatogatas" ? "active text-yellow-700" : ""
                    } hover:text-yellow-700 filterlink duration-300 h-full`}
                    href="/travels?type=varoslatogatas"
                >
                    Városlátogatások
                </Link>
                <Link
                    className={`${
                        router.query.type === "partnerek" ? "active text-yellow-700" : ""
                    } hover:text-yellow-700 filterlink duration-300 h-full`}
                    href="/travels?type=partnerek"
                >
                    Partneri utazások
                </Link>
                <Link
                    className={`${
                        router.query.type === "partnerek" ? "active text-yellow-700" : ""
                    } hover:text-yellow-700 filterlink duration-300 h-full`}
                    href="/travels?type=adventiutazas"
                >
                    Adventi utazások
                </Link>
            </div>
        </div>
    );
};

export default BottomLinks;
