import React from "react";
import Head from "next/head";
import OneTravelBody from "../../components/OneTravelComponents/OneTravelBody";
import { pageVariants } from "../../components/GlobalComponents/Transitions";
import { motion } from "framer-motion";
import { getOneTravel } from "../../lib/helpers/getDatas";

const OneTravel = ({ travel, error }) => {
    if (error) {
        return (
            <div className="text-center text-3xl h-screen font-semibold mt-8">
                <h2>Nem található a keresett utazás</h2>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Kalandozás - {travel?.title}</title>
            </Head>
            {travel.pictures?.length > 0 && (
                <>
                    <div className="relative shadow-xl w-full overflow-hidden" style={{ height: "340px" }}>
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-125 bg-no-repeat"
                            style={{ backgroundImage: `url(${travel.pictures[0].src})`, filter: "blur(55px)" }}
                        />
                    </div>
                    <div
                        className="px-4 absolute duration-300 hover:opacity-90 top-52 left-2/4 max-w-xl w-full"
                        style={{ transform: "translateX(-50%)" }}
                    >
                        <img src={travel.pictures[0].src} alt="" className="mx-auto shadow-xl max-h-96 rounded-2xl" />
                    </div>
                </>
            )}

            <motion.section initial="initial" animate="animate" variants={pageVariants}>
                <OneTravelBody travel={travel} />
            </motion.section>
        </>
    );
};

export default OneTravel;

export async function getServerSideProps({ query, res }) {
    res.setHeader("Cache-Control", "public, max-age=300, s-maxage=600, stale-while-revalidate=59");

    const parsedTravel = await getOneTravel(query.id);

    return {
        props: { travel: parsedTravel.travel || null, error: parsedTravel.error || null },
    };
}
