import DefaultLayout from "../components/DefaultLayout";
import "../styles/globals.css";
// import "../styles/quill.css";
import "../styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "react-18-image-lightbox/style.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Script from "next/script";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="/img/conti_logo.webp" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
                <link rel="dns-prefetch" href="https://cdn.kalandozas.hu" />
                <link rel="preconnect" href="https://maps.googleapis.com" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="description" content="kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta name="copyright" content="2020 © Contibus Neoline KFT." />
                <meta name="country" content="Hungary" />
                <meta name="robots" content="index, follow" />
                <meta
                    name="keywords"
                    content="iskolai osztálykirándulások, szakmai utak, kirándulás, nyaralás, sítúra, tanulmányút, körutazás, tengerparti üdülés, nyaralás, budapesti városnézés, Csoportos körutazások, Akciós utazások, városlátogatások, szervezett buszos kirándulások, adventi utazások, repülős utak, 1 napos utazás, Utazás, Buszos körutazások előfoglalási akció, Városlátogatások, Üdülések, Repülős utak, csoportos Városlátogatás, tengerparti nyaralás, teherszállítás"
                />
                <meta name="content-language" content="hu" />
                <meta property="og:description" content="Kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta property="og:site_name" content="Kalandozás Utazási iroda" />
                <meta property="og:title" content="Kalandozás Utazási iroda" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="hu_HU" />
                <meta property="og:image" content="https://cdn.kalandozas.hu/img/conti_logo.webp" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Kalandozás Utazási iroda" />
                <meta name="twitter:description" content="kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta property="twitter:image" content="https://cdn.kalandozas.hu/img/conti_logo.webp" />
                <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
                <title>Kalandozás Utazási iroda</title>
            </Head>
            {/* {process.env.NODE_ENV === "production" && (
                <>
                    <Script rel="preconnect" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_GAID}`} />
                    <Script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_GAID}', {
                                page_path: window.location.pathname,
                            });
                            `,
                        }}
                        />
                        </>
                    )} */}
            <style jsx global>{`
                html {
                    font-family: ${poppins.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                        Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;
                }
            `}</style>

            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>
        </>
    );
}

export default MyApp;
