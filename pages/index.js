import Head from "next/head";
import { pageVariants } from "../components/GlobalComponents/Transitions";
import HomeBody from "../components/HomeComponents/HomeBody";
import SearchFilter from "../components/GlobalComponents/SearchFilter";
import BottomLinks from "../components/GlobalComponents/BottomLinks";
import CustomCarousel from "../components/HomeComponents/CustomCarousel";
import { getHomeData } from "../lib/helpers/getDatas";
import { agencySchema } from "../lib/helpers/StructuredData";
import dynamic from "next/dynamic";
import Loading from "../components/GlobalComponents/Loading";
const DynamicCustomCarousel = dynamic(() => import("../components/HomeComponents/CustomCarousel"), {
    loading: () => <Loading />,
    ssr: false,
});

export default function Home({ faqs, travels, countries }) {
    return (
        <>
            <section initial="initial" animate="animate" variants={pageVariants} className="motion">
                <Head>
                    <title>Főoldal - Kalandozás Utazási iroda</title>
                    <meta property="og:image" content="https://kalandozas.hu/img/conti_logo.webp" />
                    <meta property="og:title" content="Főoldal - Kalandozás Utazási iroda" />
                    <script type="application/ld+json">{JSON.stringify(agencySchema())}</script>
                </Head>
                <DynamicCustomCarousel travels={travels} />
                <BottomLinks />
                <SearchFilter countries={countries} />
                <HomeBody questionsAnswers={faqs} travels={travels} />
            </section>
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
        revalidate: 300,
    };
}
