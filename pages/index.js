import { motion } from "framer-motion";
import Head from "next/head";
import { pageVariants } from "../components/GlobalComponents/Transitions";
import HomeBody from "../components/HomeComponents/HomeBody";
import SearchFilter from "../components/GlobalComponents/SearchFilter";
import BottomLinks from "../components/GlobalComponents/BottomLinks";
import CustomCarousel from "../components/HomeComponents/CustomCarousel";
import { getHomeData } from "../lib/helpers/getDatas";

export default function Home({ faqs, travels, hotels }) {
    return (
        <>
            <motion.section initial="initial" animate="animate" variants={pageVariants}>
                <Head>
                    <title>Főoldal - Kalandozás Utazási iroda</title>
                </Head>
                <CustomCarousel travels={travels} hotels={hotels} />
                <BottomLinks />
                <SearchFilter />
                <HomeBody questionsAnswers={faqs} travels={travels} hotels={hotels} />
            </motion.section>
        </>
    );
}

export async function getServerSideProps({ res }) {
    res.setHeader("Cache-Control", "public, max-age=300, s-maxage=600, stale-while-revalidate=59");

    const allTravels = await getHomeData();

    return {
        props: {
            faqs: allTravels.faqs || null,
            travels: allTravels.travels || null,
            hotels: allTravels.hotels || null,
        },
    };
}
