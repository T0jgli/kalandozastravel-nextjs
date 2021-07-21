import { motion } from "framer-motion";
import Head from "next/head";
import { pageVariants } from "../components/GlobalComponents/Transitions";
import HomeBody from "../components/HomeComponents/HomeBody";
import SearchFilter from "../components/GlobalComponents/SearchFilter";
import BottomLinks from "../components/GlobalComponents/BottomLinks";
import CustomCarousel from "../components/HomeComponents/CustomCarousel";

export default function Home({ faqs, travels }) {
    return (
        <>
            <motion.section initial="initial" animate="animate" variants={pageVariants}>
                <Head>
                    <title>Főoldal - Kalandozás Utazási iroda</title>
                </Head>
                <CustomCarousel travels={travels} />
                <BottomLinks />
                <SearchFilter />
                <HomeBody questionsAnswers={faqs} travels={travels} />
            </motion.section>
        </>
    );
}

export async function getServerSideProps(context) {
    context.res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");

    const allTravels = await fetch(`http://${context.req.headers.host}/api/gethomedata`, {
        headers: { Accept: "application/json", "User-Agent": "*" },
    });

    const parsedTravels = await allTravels.json();

    return {
        props: {
            faqs: parsedTravels.faqs || null,
            travels: parsedTravels.travels || null,
        },
    };
}
