import { m } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { loadingAnimation } from "./Transitions";

const FullscreenLoading = () => {
    const router = useRouter();

    const [pageLoading, setPageLoading] = useState(true);
    useEffect(() => {
        const handleStart = () => {
            setPageLoading(true);
        };
        const handleComplete = () => {
            setPageLoading(false);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
    }, [router]);

    if (pageLoading)
        return (
            <m.div
                initial="initial"
                exit="exit"
                animate="animate"
                variants={loadingAnimation}
                className={`flex bg-black bg-opacity-60 justify-center fixed left-0 top-0 w-full h-full items-center`}
            >
                <ThreeDots type="ThreeDots" color="whitesmoke" width={100} />
            </m.div>
        );

    return null;
};

export default FullscreenLoading;
