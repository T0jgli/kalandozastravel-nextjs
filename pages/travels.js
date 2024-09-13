import { AnimatePresence, m } from "framer-motion";
import Head from "next/head";
import { Suspense, useEffect, useRef, useState } from "react";
import AllCards from "../components/TravelsComponents/AllCards";
import { cardAnimation, pageVariants } from "../components/GlobalComponents/Transitions";
import { useRouter } from "next/router";
import { getAllTravels } from "../lib/helpers/getDatas";
import Infos from "../components/HomeComponents/Infos";
import { agencySchema } from "../lib/helpers/StructuredData";
import dynamic from "next/dynamic";
import Loading from "../components/GlobalComponents/Loading";

const SearchFilter = dynamic(() => import("../components/GlobalComponents/SearchFilter"), {
    loading: () => <Loading />,
    ssr: false,
});

const Topbg = dynamic(() => import("../components/GlobalComponents/Topbg"), {
    loading: () => <Loading />,
    ssr: false,
});

const DynamicAllCards = dynamic(() => import("../components/TravelsComponents/AllCards"), {
    loading: () => <Loading />,
});

export default function Travels({ travels, countries }) {
    const [travelsState, settravelsState] = useState(travels);
    const router = useRouter();

    useEffect(() => {
        if (router.query.type) {
            settravelsState(
                travels.filter((travel) => {
                    if (travel.type?.includes(router.query.type)) return true;
                    return false;
                })
            );
        } else if (router.query.month) {
            settravelsState(
                travels.filter((travel) => {
                    const month = travel?.startingDate?.split("-")?.[1]?.split("-")?.[0];
                    if (month === router.query.month) return true;
                    return false;
                })
            );
        } else if (router.query) {
            settravelsState(
                travels.filter((travel) => {
                    for (const key in router.query) {
                        if (
                            travel[key]?.toLowerCase() !== router.query[key]?.toLowerCase() &&
                            !travel[key]?.toLowerCase()?.includes(router.query[key]?.toLowerCase())
                        )
                            return false;
                    }
                    return true;
                })
            );
        }
    }, [router.query]);

    return (
        <m.section initial="initial" animate="animate" variants={pageVariants} className="motion">
            <Head>
                <title>Utazásaink - Kalandozás Utazási iroda</title>
                <meta property="og:image" content="https://kalandozas.hu/img/conti_logo.webp" />
                <meta property="og:title" content="Utazásaink - Kalandozás Utazási iroda" />
                <script type="application/ld+json">{JSON.stringify(agencySchema())}</script>
            </Head>
            <Topbg />
            <SearchFilter countries={countries} />
            <div className="text-center mt-16">
                {travelsState.length !== travels.length && (
                    <button
                        className="bg-yellow-700 p-3 text-white rounded-lg text-sm duration-300 hover:bg-yellow-800 hover:shadow-lg"
                        onClick={() => {
                            router.push({
                                pathname: "/travels",
                                query: null,
                            });
                        }}
                    >
                        Szűrők törlése
                    </button>
                )}
                <h2 className="text-2xl py-5 text-gray-800">{travelsState.length} utazás található</h2>
            </div>
            <div className="flex flex-col max-w-7xl mx-auto">
                <div className="my-5 flex flex-wrap items-stretch justify-items-center">
                    <Suspense>
                        <AnimatePresence>
                            {travelsState.map((travel) => (
                                <m.div
                                    className="xl:w-1/4 w-full sm:w-2/4 lg:w-1/3 p-5 self-stretch h-full"
                                    key={travel.id}
                                    initial="initial"
                                    exit="exit"
                                    animate="animate"
                                    variants={cardAnimation}
                                >
                                    <DynamicAllCards
                                        id={travel.id}
                                        thumbnail={travel.thumbnail}
                                        backgroundImage={travel.photoURL || travel.pictures?.[0]?.src || ""}
                                        title={travel.title}
                                        isSale={travel.isSale}
                                        country={travel.country}
                                        timestamp={travel.timestamp}
                                        startingDate={travel.startingDate}
                                        endingDate={travel.endingDate}
                                        places={travel.freePlaces}
                                        price={travel.price}
                                        type2={travel.type2}
                                        customUrl={travel.customUrl}
                                    />
                                </m.div>
                            ))}
                        </AnimatePresence>
                    </Suspense>
                </div>
            </div>
            <Infos />
        </m.section>
    );
}

export async function getStaticProps() {
    const parsedTravels = await getAllTravels();
    return {
        props: {
            travels: parsedTravels.travels || null,
            countries: parsedTravels?.countries || null,
        },
        revalidate: 300,
    };
}
