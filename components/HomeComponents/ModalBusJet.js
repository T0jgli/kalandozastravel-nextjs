import React, { useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

const ModalBusJet = ({ busjetModal, setBusjetModal }) => {
    const modalRef = useRef(null);

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef?.current?.contains(event.target)) {
            closeModal();
        }
    }

    function closeModal() {
        setBusjetModal({ ...busjetModal, open: false });
    }

    return (
        <div
            className={`${
                busjetModal?.open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            } fixed overflow-y-auto overflow-x-hidden flex flex-wrap justify-center my-0 mx-auto top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-80 duration-500 ease-in-out`}
            onClick={handleClickOutside}
            role="dialog"
            aria-label="Modal"
        >
            <div
                className={`relative overflow-hidden block max-w-6xl h-auto w-full mx-2 md:mx-auto my-10 z-50 rounded-2xl shadow-xl transform duration-500 ease-out ${
                    busjetModal?.open ? "opacity-100 top-0 " : "opacity-0 -top-96"
                }`}
            >
                <div className="absolute overflow-hidden shadow-sm flex z-50 justify-between mx-auto w-full items-center rounded-2xl bg-white top-0 left-0 p-5 h-20 ">
                    <p className="text-xl font-medium text-gray-700">Bus Jet Business Class</p>
                    <HiOutlineX className="cursor-pointer text-2xl" onClick={closeModal} />
                </div>
                <div className="my-28 md:mx-5 flex flex-wrap justify-between gap-8">
                    <div className="mx-auto lg:mx-0 w-full break-words" style={{ wordBreak: "break-word" }}>
                        <div ref={modalRef} className="bg-white p-8 rounded-2xl flex  flex-col flex-wrap">
                            <h2 className="text-center text-lg pb-4">Berlin - Budapest – Berlin business class bus jet buszjárat</h2>
                            <p className="pb-4 font-medium text-center">- belvárostól belvárosig történő utaztatás -</p>
                            <p className="py-4">
                                Az utazás teljes hossza alatt WiFi hozzáférés és utaskisérő hostess gondoskodik az utasok maximális kényelméről és
                                kiszolgálásáról, melynek része hideg és meleg ételek valamint szeszes és üditő italok széles választékának
                                felszolgálása is. A járat nem áll meg útközben a két végpont között. A buszon 220V-os csatlakozó is van, így a
                                laptopok, telefonok töltése is megoldott.
                            </p>
                            <div className="text-center">
                                <p className="font-medium pb-2">Buszokat a Neoline Kft. – Contibus biztosítja.</p>
                                <small className="pb-4 block">
                                    Minden autóbuszunk megfelel a szigorú nemzetközi előírásoknak.
                                    <br />
                                    Gépkocsivezetőink nagy tapasztalattal rendelkeznek az európai utaztatásban. Közel 30 éves tapasztalattal
                                    rendelkezünk az utaztatásban.
                                </small>
                                <a href="https://contibus.hu/" target="_blank" rel="noopener norefereer" className="text-gray-500 block pb-8">
                                    https://contibus.hu/
                                </a>
                            </div>
                            <hr />
                            <p className="pb-4 pt-8 font-medium">Indulási és érkezési helyszínek, időpontok:</p>
                            <ol className="">
                                <li>H-1123 Budapest, Jagello út 1-3, Budapest Convetion Centre (BKK) parkoló Busz indulása: 07:00 kedd, csütörtök</li>
                                <li>D-10178 Berlin, Alexanderstraße 5., Hotel Park Inn Radisson Busz indulása: 07:00 szerda, péntek</li>
                            </ol>
                            <a
                                href="https://hunisphere-zrt.com/busjetbusinessclass/"
                                target="_blank"
                                rel="noopener norefereer"
                                className="my-8 mx-auto"
                            >
                                <button className="rounded-2xl border-2 border-transparent w-56  p-3 font-semibold bg-yellow-700 hover:shadow-xl text-white duration-300 hover:border-yellow-700 hover:text-yellow-700 focus:outline-none hover:bg-white">
                                    Jegyfoglalás
                                </button>
                            </a>
                            <small className="text-center">Bővebb információkért keressenek minket bizalommal!</small>
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

export default ModalBusJet;
