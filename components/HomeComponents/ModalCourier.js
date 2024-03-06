import React, { useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

const ModalCourier = ({ modalCourier, setmodalCourier }) => {
    const modalRef = useRef(null);

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef?.current?.contains(event.target)) {
            closeModal();
        }
    }

    function closeModal() {
        setmodalCourier({ ...modalCourier, open: false });
    }

    return (
        <div
            className={`${
                modalCourier?.open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            } modal fixed overflow-y-auto overflow-x-hidden flex flex-wrap justify-center my-0 mx-auto top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-80 duration-500 ease-in-out`}
            onClick={handleClickOutside}
            role="dialog"
            aria-label="Modal"
        >
            <div
                className={`relative overflow-hidden block max-w-6xl h-auto w-full mx-2 md:mx-auto my-24 z-50 rounded-2xl shadow-xl transform duration-500 ease-out ${
                    modalCourier?.open ? "opacity-100 top-0 " : "opacity-0 -top-96"
                }`}
            >
                <div className="absolute overflow-hidden shadow-sm flex z-50 justify-between mx-auto w-full items-center rounded-2xl bg-white top-0 left-0 p-5 h-20 ">
                    <p className="text-xl font-medium text-gray-700">Csomagpontjaink</p>
                    <HiOutlineX className="modalcloseicon cursor-pointer text-2xl" onClick={closeModal} />
                </div>
                <div className="my-28 md:mx-5 flex flex-wrap justify-between gap-8">
                    <div className="mx-auto lg:mx-0 w-full break-words" style={{ wordBreak: "break-word" }}>
                        <div ref={modalRef} className="bg-white p-8 rounded-2xl flex  flex-col flex-wrap">
                            {/* <h2 className="text-center text-lg pb-4"></h2> */}
                            <a href="https://gls-group.eu/HU/hu/home" target="_blank" rel="noopener noreferrer" className="my-6">
                                <img
                                    src="https://cdn.kalandozas.hu/img/glscsomagpont.png"
                                    alt="GLS csomagpont"
                                    className="object-contain h-full w-full max-h-32 duration-300 hover:opacity-90"
                                />
                            </a>
                            <a href="https://wish.com" target="_blank" rel="noopener noreferrer" className="my-6">
                                <img
                                    src="https://cdn.kalandozas.hu/img/wish.png"
                                    alt="Wish csomagpont"
                                    className="object-contain h-full w-full max-h-32 duration-300 hover:opacity-90"
                                />
                            </a>

                            <a href="https://www.dpd.com/hu/hu/" target="_blank" rel="noopener noreferrer" className="my-6">
                                <img
                                    src="https://cdn.kalandozas.hu/img/dpd-csomagpont.png"
                                    alt="DPD csomagpont"
                                    className="object-contain h-full w-full max-h-32 duration-300 hover:opacity-90"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                {/* <div className="absolute shadow-sm flex z-50 justify-end mx-auto w-full items-center rounded-2xl bg-gray-200 bottom-0 left-0 p-5 h-20 ">
                    <button
                        onClick={closeModal}
                        className="rounded-2xl border-2 border-transparent p-3 font-semibold bg-yellow-700 hover:shadow-xl text-white duration-300 hover:border-yellow-700 hover:text-yellow-700 focus:outline-none hover:bg-white"
                    >
                        Bezárás
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ModalCourier;
