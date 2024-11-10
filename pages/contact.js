import dynamic from "next/dynamic";
import Head from "next/head";
import { pageVariants } from "../components/GlobalComponents/Transitions";
import ContactForm from "../components/ContactComponents/ContactForm";
import ContactInfo from "../components/ContactComponents/ContactInfo";
import Topbg from "../components/GlobalComponents/Topbg";
import { agencySchema } from "../lib/helpers/StructuredData";
const Gallery = dynamic(() => import("../components/GlobalComponents/Gallery"));

export default function Contact() {
    return (
        <section initial="initial" animate="animate" variants={pageVariants} className="motion">
            <Head>
                <title>Kapcsolat - Kalandozás Utazási iroda</title>
                <meta property="og:image" content="https://kalandozas.hu/img/conti_logo.webp" />
                <meta property="og:title" content="Kapcsolat - Kalandozás Utazási iroda" />
                <script type="application/ld+json">{JSON.stringify(agencySchema())}</script>
            </Head>
            <Topbg />
            <div className="flex md:flex-row flex-col px-3 2xl:px-0 max-w-7xl mx-auto mt-20 md:mt-32">
                <ContactInfo />
                <ContactForm />
            </div>
            <Gallery />
        </section>
    );
}
