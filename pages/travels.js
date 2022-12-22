import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import AllCards from "../components/TravelsComponents/AllCards";
import { cardAnimation, pageVariants } from "../components/GlobalComponents/Transitions";
import Topbg from "../components/GlobalComponents/Topbg";
import { useRouter } from "next/router";
import SearchFilter from "../components/GlobalComponents/SearchFilter";
import { getAllTravels } from "../lib/helpers/getDatas";
import Infos from "../components/HomeComponents/Infos";

export default function Travels({ travels }) {
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
        <motion.section initial="initial" animate="animate" variants={pageVariants}>
            <Head>
                <title>Utazásaink - Kalandozás Utazási iroda</title>
            </Head>
            <Topbg />
            <SearchFilter />
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
                        Törlés
                    </button>
                )}
                <h2 className="text-2xl py-5 text-gray-800">{travelsState.length} utazás található</h2>
            </div>
            <div className="flex flex-col max-w-7xl mx-auto">
                <div className="my-5 flex flex-wrap items-stretch justify-items-center">
                    <AnimatePresence>
                        {travelsState.map((travel) => (
                            <motion.div
                                id="card"
                                className="xl:w-1/4 w-full sm:w-2/4 lg:w-1/3 p-5 self-stretch h-full"
                                key={travel.id}
                                initial="initial"
                                exit="exit"
                                animate="animate"
                                variants={cardAnimation}
                            >
                                <AllCards
                                    id={travel.id}
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <Infos />
        </motion.section>
    );
}

export async function getStaticProps() {
    const parsedTravels = await getAllTravels();
    return {
        props: {
            travels: parsedTravels.travels || null,
        },
        revalidate: 60,
    };
}
