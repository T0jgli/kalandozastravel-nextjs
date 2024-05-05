import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BottomLinks = () => {
    const router = useRouter();
    return (
        <>
            <div className="h-auto w-full bg-white shadow" style={{ minHeight: "4rem" }}>
                <div
                    className="flex flex-wrap gap-8 justify-center items-center h-auto mx-auto uppercase font-medium py-5 md:py-0"
                    style={{ minHeight: "4rem" }}
                >
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.type === "1naposutazas" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?type=1naposutazas"
                    >
                        1 napos utazások
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.type === "korutazas" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?type=korutazas"
                    >
                        Körutazások
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.type === "nonstop" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?type=nonstop"
                    >
                        Non-Stop utazások
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.type === "varoslatogatas" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?type=varoslatogatas"
                    >
                        Városlátogatások
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.type === "partnerek" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?type=partnerek"
                    >
                        Partneri utazások
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.type === "adventiutazas" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?type=adventiutazas"
                    >
                        Adventi utazások
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.type === "unnepnapokon" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?type=unnepnapokon"
                    >
                        Ünnepnapokon
                    </Link>
                </div>
            </div>

            <div className="h-auto w-full mt-4 bg-white shadow" style={{ minHeight: "4rem" }}>
                <div
                    className="flex flex-wrap gap-8 justify-center items-center h-auto mx-auto uppercase font-medium py-5 md:py-0"
                    style={{ minHeight: "4rem" }}
                >
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "01" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=01"
                    >
                        Január
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "02" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=02"
                    >
                        Február
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "03" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=03"
                    >
                        Március
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "04" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=04"
                    >
                        Április
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "05" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=05"
                    >
                        Május
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "06" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=06"
                    >
                        Június
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "07" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=07"
                    >
                        Július
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "08" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=08"
                    >
                        Augusztus
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "09" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=09"
                    >
                        Szeptember
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "10" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=10"
                    >
                        Október
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "11" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=11"
                    >
                        November
                    </Link>
                    <Link
                        prefetch={false}
                        className={`${
                            router.query.month === "12" ? "active text-yellow-700" : ""
                        } hover:text-yellow-700 filterlink duration-300 h-full`}
                        href="/travels?month=12"
                    >
                        December
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BottomLinks;
