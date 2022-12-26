import React from "react";

const Footer = () => {
    return (
        <footer className="pt-10 pb-10 md:pb-0 relative" id="footer">
            <div className="w-full my-4 h-60">
                <iframe
                    title="Google Maps Iframe"
                    className="m-0 w-full h-full shadow-lg"
                    src={
                        "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJcZcmwULcQUcRbO4wF14ieDg&key=" +
                        "AIzaSyAxz-bKPvunFWDKyfhGGOB0qZNjtHm4exA"
                    }
                    frameBorder="0"
                />
            </div>
            <div className="flex py-8 border-b-2 gap-5 border-gray-200 text-gray-700 flex-wrap items-center justify-center"></div>
            <div className="max-w-7xl px-3 2xl:px-0 py-10 mx-auto opacity-70 flex md:flex-row flex-col justify-between text-center" id="copyright">
                <p className="text-gray-700 mb-6 md:mb-0">&#169; {new Date().getFullYear()} Neoline-Kalandozás Utazási Iroda</p>
                <div className="flex text-gray-700 font-medium justify-center gap-6">
                    <a target="_blank" rel="noopener noreferrer" href="/files/utazasi-szerzodes.pdf" className="duration-300 hover:text-yellow-700">
                        Utazási szerződés
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="/files/adatvedelmi-tajekoztato.pdf"
                        className="duration-300 hover:text-yellow-700"
                    >
                        Adatvédelmi tájékoztató
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
