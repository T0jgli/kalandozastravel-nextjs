import DefaultLayout from "../components/DefaultLayout";
import "../styles/globals.css";
import "../styles/quill.css";
import "../styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "react-18-image-lightbox/style.css";
import "react-image-gallery/styles/css/image-gallery.css";

function MyApp({ Component, pageProps }) {
    return (
        <DefaultLayout>
            <Component {...pageProps} />
        </DefaultLayout>
    );
}

export default MyApp;
