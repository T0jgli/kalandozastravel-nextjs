import React, { useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

const ModalHotels = ({ hotelsModal, setHotelsModal }) => {
    const modalRef = useRef(null);
    const modalRef2 = useRef(null);

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef?.current?.contains(event.target) && !modalRef2?.current?.contains(event.target)) {
            closeModal();
        }
    }

    function closeModal() {
        setHotelsModal({ ...hotelsModal, open: false });
    }

    return (
        <div
            className={`${
                hotelsModal?.open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            } fixed overflow-y-auto overflow-x-hidden flex flex-wrap justify-center my-0 mx-auto top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-80 duration-500 ease-in-out`}
            onClick={handleClickOutside}
            role="dialog"
        >
            <div
                className={`relative overflow-hidden block max-w-6xl h-auto w-full mx-2 md:mx-auto my-10 z-50 rounded-2xl shadow-xl transform duration-500 ease-out ${
                    hotelsModal?.open ? "opacity-100 top-0 " : "opacity-0 -top-96"
                }`}
            >
                <div className="absolute overflow-hidden shadow-sm flex z-50 justify-between mx-auto w-full items-center rounded-2xl bg-white top-0 left-0 p-5 h-20 ">
                    <p className="text-xl font-medium text-gray-700">Berlini szállodák</p>
                    <HiOutlineX className="cursor-pointer text-2xl" onClick={closeModal} />
                </div>
                <div className="my-28 md:mx-5 flex flex-wrap justify-between gap-8">
                    <div ref={modalRef} className="mx-auto lg:mx-0">
                        <div className="relative w-96 h-80 overflow-hidden rounded-t-2xl">
                            <img
                                src={"/img/berlin/hotel_mondai_base.jpg"}
                                className="object-cover absolute top-0 duration-300 rounded-t-2xl w-96 h-80 transform hover:scale-105"
                                alt="Hotel Mondial fő kép"
                            />
                        </div>
                        <div className="bg-white h-auto w-96 rounded-b-2xl flex flex-col items-center justify-center">
                            <h3 className="text-center text-2xl mt-6">Hotel Mondial</h3>
                            <ul className="mt-6 list-disc">
                                <li>
                                    Standard egyágyas szoba - <span className="font-light">99 €</span>
                                </li>
                                <li>
                                    Standard kétágyas szoba - <span className="font-light">125 €</span>
                                </li>
                                <li>
                                    Superior egyágyas szoba - <span className="font-light">115 €</span>
                                </li>
                                <li>
                                    Superior kétágyas szoba - <span className="font-light">145 €</span>
                                </li>
                            </ul>
                            <small className="text-center mt-6">
                                a szobaárak tartalmazzák a minibár ingyenes egyszeri használatát (csak alkoholmentes italok), további töltelékeket
                                kérésre és térítés ellenében
                            </small>
                            <small className="text-center pt-3 mb-6">a szobaárak tartalmazzák a higiéniai készletet</small>
                            <div className="flex justify-center w-28 h-28 rounded-2xl mb-6 gap-8">
                                <img src="/img/berlin/hotel_mondai_1.jpg" className="rounded-lg object-cover" alt="Hotel Mondial galéria 1" />
                                <img src="/img/berlin/hotel_mondai_2.jpg" className="rounded-lg object-cover" alt="Hotel Mondial galéria 2" />
                            </div>
                        </div>
                    </div>
                    <div ref={modalRef2} className="mx-auto lg:mx-0">
                        <div className="relative w-96 h-80 overflow-hidden rounded-t-2xl">
                            <img
                                src={"/img/berlin/hotel_park_inn_base.jpg"}
                                className="object-cover absolute top-0 duration-300 rounded-t-2xl w-96 h-80 transform hover:scale-105"
                                alt="Hotel Park Inn Radisson fő kép"
                            />
                        </div>

                        <div className="bg-white h-auto w-96 rounded-b-2xl flex flex-col items-center justify-center">
                            <h3 className="text-center text-2xl my-6">Hotel Park Inn Radisson</h3>
                            <div className="flex justify-center w-28 h-28 rounded-2xl mb-6 gap-8">
                                <img
                                    src="/img/berlin/hotel_park_inn_1.jpg"
                                    className="rounded-lg object-cover"
                                    alt="Hotel Park Inn Radisson galéria 1"
                                />
                                <img
                                    src="/img/berlin/hotel_park_inn_2.jpg"
                                    className="rounded-lg object-cover"
                                    alt="Hotel Park Inn Radisson galéria 2"
                                />
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

export default ModalHotels;
