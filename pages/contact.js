import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import { pageVariants } from "../components/GlobalComponents/Transitions";
import ContactForm from "../components/ContactComponents/ContactForm";
import ContactInfo from "../components/ContactComponents/ContactInfo";
import Topbg from "../components/GlobalComponents/Topbg";
const Gallery = dynamic(() => import("../components/GlobalComponents/Gallery"));

export default function Contact() {
    return (
        <motion.section initial="initial" animate="animate" variants={pageVariants}>
            <Head>
                <title>Kapcsolat - Kalandozás Utazási iroda</title>
            </Head>
            <Topbg />
            <div className="flex md:flex-row flex-col px-3 2xl:px-0 max-w-7xl mx-auto mt-20 md:mt-32">
                <ContactInfo />
                <ContactForm />
            </div>
            <Gallery />
        </motion.section>
    );
}
