import { AnimatePresence, motion } from "framer-motion";
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
            <AnimatePresence exitBeforeEnter>
                {show && (
                    <motion.div
                        initial="initial"
                        exit="exit"
                        animate="animate"
                        variants={cardAnimation}
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            })
                        }
                        className="fixed rounded-lg text-black cursor-pointer z-20 bottom-5 right-5 duration-300 bg-transparent"
                    >
                        <HiChevronUp fontSize="2rem" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ScrollTopButton;
