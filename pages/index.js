import { motion } from "framer-motion";
import Head from "next/head";
import { pageVariants } from "../components/GlobalComponents/Transitions";
import HomeBody from "../components/HomeComponents/HomeBody";
import SearchFilter from "../components/GlobalComponents/SearchFilter";
import BottomLinks from "../components/GlobalComponents/BottomLinks";
import CustomCarousel from "../components/HomeComponents/CustomCarousel";
import { getHomeData } from "../lib/helpers/getDatas";
import { agencySchema } from "../lib/helpers/StructuredData";

export default function Home({ faqs, travels, countries }) {
    return (
        <>
            <motion.section initial="initial" animate="animate" variants={pageVariants}>
                <Head>
                    <title>Főoldal - Kalandozás Utazási iroda</title>
                    <script type="application/ld+json">{JSON.stringify(agencySchema())}</script>
                </Head>
                <CustomCarousel travels={travels} />
                <BottomLinks />
                <SearchFilter countries={countries} />
                <HomeBody questionsAnswers={faqs} travels={travels} />
            </motion.section>
        </>
    );
}

export async function getStaticProps() {
    const allTravels = await getHomeData();

    return {
        props: {
            faqs: allTravels?.faqs || null,
            travels: allTravels?.travels || null,
            countries: allTravels?.countries || null,
        },
        revalidate: 150,
    };
}
