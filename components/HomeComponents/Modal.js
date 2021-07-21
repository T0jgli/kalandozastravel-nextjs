import React, { useRef } from "react";
import { HiOutlineX } from "react-icons/hi";
import ModalContent from "./ModalContent";

const Modal = ({ modalOpen, setModalOpen }) => {
    const modalRef = useRef(null);

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef?.current?.contains(event.target)) {
            setModalOpen({ ...modalOpen, open: false });
        }
    }

    return (
        <div
            className={`${
                modalOpen.open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            } fixed overflow-y-auto overflow-x-hidden flex flex-wrap justify-center my-0 mx-auto top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-70 duration-500 ease-in-out`}
            onClick={handleClickOutside}
        >
            <div
                className={`relative overflow-hidden block max-w-6xl h-auto w-full mx-2 md:mx-auto my-10 z-50 rounded-2xl bg-gray-100 shadow-xl transform duration-500 ease-out ${
                    modalOpen.open ? "opacity-100 top-0 " : "opacity-0 -top-96"
                }`}
                ref={modalRef}
            >
                <div className="absolute overflow-hidden shadow-sm flex z-50 justify-between mx-auto w-full items-center rounded-2xl bg-gray-200 top-0 left-0 p-5 h-20 ">
                    <p className="text-xl font-medium text-gray-700">{modalOpen.title}</p>
                    <HiOutlineX className="cursor-pointer text-2xl" onClick={() => setModalOpen({ ...modalOpen, open: false })} />
                </div>
                <div className="my-32 md:mx-5 h-auto">
                    <ModalContent travels={modalOpen?.travels} />
                </div>
                <div className="absolute shadow-sm flex z-50 justify-end mx-auto w-full items-center rounded-2xl bg-gray-200 bottom-0 left-0 p-5 h-20 ">
                    <button
                        onClick={() => setModalOpen({ ...modalOpen, open: false })}
                        className="rounded-2xl border-2 border-transparent p-3 font-semibold bg-yellow-700 hover:shadow-xl text-white duration-300 hover:border-yellow-700 hover:text-yellow-700 focus:outline-none hover:bg-white"
                    >
                        Bezárás
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
