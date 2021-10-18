import React, { useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

const Modalcomingsoon = ({ comingSoonModal, setComingSoonModal }) => {
    const modalRef = useRef(null);

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef?.current?.contains(event.target)) {
            closeModal();
        }
    }

    function closeModal() {
        setComingSoonModal({ ...comingSoonModal, open: false });
    }

    return (
        <div
            className={`${
                comingSoonModal?.open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            } fixed overflow-y-auto overflow-x-hidden flex flex-wrap justify-center my-0 mx-auto top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-80 duration-500 ease-in-out`}
            onClick={handleClickOutside}
            role="dialog"
        >
            <div
                className={`relative overflow-hidden block h-auto w-full mx-2 md:mx-auto my-10 z-50 rounded-2xl shadow-xl transform duration-500 ease-out ${
                    comingSoonModal?.open ? "opacity-100 top-0 " : "opacity-0 -top-96"
                }`}
            >
                <div className="absolute overflow-hidden shadow-sm  flex z-50 justify-between mx-auto w-full items-center rounded-2xl bg-white top-0 left-0 p-5 h-20 ">
                    <p className="text-xl font-medium text-gray-700">Coming Soon</p>
                    <HiOutlineX className="cursor-pointer text-2xl" onClick={closeModal} />
                </div>
                <div className="my-28 md:mx-5 flex flex-wrap justify-center gap-8">
                    <div ref={modalRef} className="grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/1.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Parndorf</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/2.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Bécs</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/3.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Tátra</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/4.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Velence</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/5.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Jesolo</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/6.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Johannesbach</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/7.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Prága</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/8.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Pozsony</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/9.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Caorle</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/10.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Plitvice</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/11.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Donovaly</h3>
                            </div>
                        </div>
                        <div>
                            <div className="relative w-80 h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src="/img/comingsoon/12.jpg"
                                    className="object-cover absolute top-0 duration-300 rounded-t-2xl w-80 h-80 transform hover:scale-105"
                                    alt="Hotel Mondial fő kép"
                                />
                            </div>
                            <div className="bg-white h-auto w-80 rounded-b-2xl flex flex-col items-center justify-center">
                                <h3 className="text-center text-xl my-3">Hallstatt</h3>
                            </div>
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

export default Modalcomingsoon;
