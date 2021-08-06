import React, { useEffect, useRef, useState } from "react";
import { HiOutlineExclamation } from "react-icons/hi";

const TemporaryAlert = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef?.current?.contains(event.target)) {
            setModalOpen(false);
            sessionStorage.setItem("acceptedSpamEmails", "true");
        }
    }

    useEffect(() => {
        const term = sessionStorage.getItem("acceptedSpamEmails");
        let timeout;

        if (!term) {
            timeout = setTimeout(() => {
                setModalOpen(true);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className={`${
                modalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            } fixed overflow-y-auto overflow-x-hidden flex flex-wrap justify-center my-0 mx-auto top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-70 duration-500 ease-in-out`}
            onClick={handleClickOutside}
            role="dialog"
            aria-labelledby="spamDialogTitle"
            aria-describedby="spamDialogDesc"
        >
            <div className={`inline-block w-full relative duration-300 px-8 md:px-0 ${modalOpen ? "opacity-100 top-0" : "opacity-0 -top-96"}`}>
                <div className={`flex flex-col p-8 bg-white shadow-md hover:shodow-lg rounded-2xl md:w-1/2 w-full mx-auto my-5 `} ref={modalRef}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex flex-col md:flex-row items-center">
                            <HiOutlineExclamation
                                fontSize="2rem"
                                className="w-16 h-16 rounded-2xl p-3 border border-red-100 text-red-700 bg-red-50"
                            />
                            <div className="px-4 py-3 text-gray-600">
                                <p className="text-lg font-semibold text-center md:text-left" id="spamDialogTitle">
                                    FIGYELEM
                                </p>
                                <p className="text-center md:text-left my-4 md:my-0" id="spamDialogDesc">
                                    Egyes email kiszolgálók a <strong className="font-medium">spam</strong> mappába tehetik a válaszemaileket!
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setModalOpen(false);
                                sessionStorage.setItem("acceptedSpamEmails", "true");
                            }}
                            className="flex-no-shrink bg-red-500 px-5 md:ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
                        >
                            Bezárás
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemporaryAlert;
