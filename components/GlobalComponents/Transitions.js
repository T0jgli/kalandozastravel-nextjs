export const pageVariants = {
    initial: { y: -50, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
};
export const travelImage = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
};
export const cardAnimation = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
};

export const loadingAnimation = {
    initial: { opacity: 0, zIndex: -5 },
    animate: {
        opacity: 1,
        zIndex: 50,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
    exit: {
        opacity: 0,
        zIndex: -5,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};
