import { AnimatePresence, m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiChevronUp } from "react-icons/hi";
import { cardAnimation } from "./Transitions";

const ScrollTopButton = () => {
    const [show, setshow] = useState(false);
    useEffect(() => {
        function scrollShow() {
            if (this.scrollY >= 200 && !show) setshow(true);
            else setshow(false);
        }

        window.addEventListener("scroll", scrollShow);

        return () => window.removeEventListener("scroll", scrollShow);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {show && (
                    <m.div
                        initial="initial"
                        exit="exit"
                        animate="animate"
                        variants={cardAnimation}
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                            }
                        }}
                        id="scrolltopbutton"
                        className="fixed rounded-lg text-black cursor-pointer z-20 bottom-5 right-5 duration-300 bg-transparent"
                    >
                        <HiChevronUp fontSize="2rem" />
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ScrollTopButton;
