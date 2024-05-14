import DefaultLayout from "../components/DefaultLayout";
import "../styles/globals.css";
// import "../styles/quill.css";
import "../styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "react-18-image-lightbox/style.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Script from "next/script";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

function MyApp({ Component, pageProps }) {
    return (
        <>
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
