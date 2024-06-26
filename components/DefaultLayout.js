import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Cookie from "./GlobalComponents/Cookie";
import FullscreenLoading from "./GlobalComponents/FullscreenLoading";
import Navbar from "./GlobalComponents/Navbar";
import ScrollTopButton from "./GlobalComponents/ScrollTopButton";
import { pageview } from "../lib/helpers/gtag";
import { LazyMotion, domAnimation } from "framer-motion";
import Loading from "./GlobalComponents/Loading";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./GlobalComponents/Footer"), {
    loading: () => <Loading />,
    ssr: false,
});

const DefaultLayout = ({ children }) => {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => {
            pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <LazyMotion features={domAnimation}>
            <Navbar />
            {children}
            <ToastContainer autoClose={5000} position="bottom-center" theme="colored" />
            <FullscreenLoading />
            <Cookie />
            <ScrollTopButton />
            <Footer />
        </LazyMotion>
    );
};

export default DefaultLayout;
