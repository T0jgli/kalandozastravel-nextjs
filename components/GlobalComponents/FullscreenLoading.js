"use client";
import React, { useEffect } from "react";
import Loader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import * as NProgress from "nprogress";

export default function NextTopLoader() {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.done();
    }, [pathname]);

    return <Loader color="#a16207" />;
}
