import React from "react";
import Head from "next/head";
import OneTravelBody from "../../components/OneTravelComponents/OneTravelBody";
import { pageVariants, travelImage } from "../../components/GlobalComponents/Transitions";
import { motion } from "framer-motion";
import { getIDs, getOneTravel } from "../../lib/helpers/getDatas";

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
                <title>Kalandozás - {travel.title}</title>
            </Head>
            {travel.pictures?.length > 0 && (
                <>
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={pageVariants}
                        className="relative shadow-xl w-full overflow-hidden"
                        style={{ height: "340px" }}
                    >
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-125 bg-no-repeat"
                            style={{ backgroundImage: `url(${travel.pictures[0].src})`, filter: "blur(55px)" }}
                            id="blurimage"
                        />
                    </motion.div>

                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={travelImage}
                        className="px-4 absolute duration-300 hover:opacity-90 top-52 left-2/4 max-w-xl w-full"
                        style={{ transform: "translateX(-50%)" }}
                    >
                        <img src={travel.pictures[0].src} alt={`Utazás kép fő`} className="mx-auto shadow-xl max-h-96 rounded-2xl" id="topimage" />
                    </motion.div>
                </>
            )}

            <motion.section initial="initial" animate="animate" variants={pageVariants}>
                <OneTravelBody travel={travel} />
            </motion.section>
        </>
    );
};

export default OneTravel;

export async function getStaticProps(context) {
    const parsedTravel = await getOneTravel(context.params.id);

    return {
        props: { travel: parsedTravel.travel || null, error: parsedTravel.error || null },
        revalidate: 120,
    };
}

export async function getStaticPaths() {
    const ids = await getIDs();
    return {
        paths: ids,
        fallback: false, // can also be true or 'blocking'
    };
}
