import React, { useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

const ModalHatartalanul = ({ hatartalanulModals, sethatartalanulModals }) => {
    const modalRef = useRef(null);

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef?.current?.contains(event.target)) {
            closeModal();
        }
    }

    function closeModal() {
        sethatartalanulModals({ ...hatartalanulModals, open: false });
    }

    return (
        <div
            className={`${
                hatartalanulModals?.open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            } fixed overflow-y-auto overflow-x-hidden flex flex-wrap justify-center my-0 mx-auto top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-80 duration-500 ease-in-out`}
            onClick={handleClickOutside}
            role="dialog"
        >
            <div
                className={`relative overflow-hidden block max-w-6xl h-auto w-full mx-2 md:mx-auto my-10 z-50 rounded-2xl shadow-xl transform duration-500 ease-out ${
                    hatartalanulModals?.open ? "opacity-100 top-0 " : "opacity-0 -top-96"
                }`}
            >
                <div className="absolute overflow-hidden shadow-sm flex z-50 justify-between mx-auto w-full items-center rounded-2xl bg-white top-0 left-0 p-5 h-20 ">
                    <p className="text-xl font-medium text-gray-700">Határtalanul</p>
                    <HiOutlineX className="cursor-pointer text-2xl" onClick={closeModal} />
                </div>
                <div className="my-28 md:mx-5 flex flex-wrap justify-between gap-8">
                    <div className="mx-auto lg:mx-0 w-full break-words" style={{ wordBreak: "break-word" }}>
                        <div ref={modalRef} className="bg-white p-8 rounded-2xl flex  flex-col flex-wrap">
                            <h2 className="text-center text-lg pb-8">
                                Megjelent a Határtalanul 2022-es pályázati kiírása, mely a jelenlegi hetedikes osztályok, valamint középiskolás
                                csoportok kárpát-medencei utazását támogatja.
                            </h2>
                            <p className="py-2">
                                A pályázatok benyújtásának határideje <span className="font-semibold">2022. október 29.</span>
                            </p>
                            <p className="py-2">Kik pályázhatnak: hetedikesek és középiskolások.</p>
                            <p className="py-2">
                                Az utazások <span className="font-semibold">2021. szeptember 1. és 2023. augusztus 31.</span> között valósulhatnak
                                meg.
                                <br />
                                <small>Segítünk kiválasztani a legmegfelelőbb időpontokat.</small>
                            </p>
                            <p className="py-8 text-center">
                                A korábbi évekhez hasonlóan segítünk a pályázatok, illetve a kalkulációk elkészítésében. Erdélyi, felvidéki, délvidéki
                                és kárpátaljai– a pályázati kiírásnak megfelelő programjaink vannak.
                                <a
                                    href="https://hatartalanul.studentlines.hu/programjaink/#karpatalja"
                                    target="_blank"
                                    rel="noopener norefereer"
                                    className="text-gray-500 block py-2"
                                >
                                    https://hatartalanul.studentlines.hu/programjaink/#karpatalja
                                </a>
                                <br />
                                <small className="">
                                    Javasoljuk, hogy az utazni vágyó csoportok ezek közül válasszanak, ugyanakkor lehetőség van egyéni elképzelések
                                    megvalósítására is.
                                </small>
                            </p>
                            <div className="flex justify-center">
                                <div className="flex justify-center w-24 h-24 md:w-32 md:h-32 rounded-2xl mb-6 gap-8 text-center">
                                    <img src="/img/hatartalanul/1.jpg" className="rounded-lg object-cover" alt="Határtalanul 1" />
                                    <img src="/img/hatartalanul/2.jpg" className="rounded-lg object-cover" alt="Határtalanul 2" />
                                    <img src="/img/hatartalanul/3.jpg" className="rounded-lg object-cover" alt="Határtalanul 3" />
                                </div>
                            </div>
                            <hr />
                            <h4 className="text-lg pt-8 font-medium ">Ajánlatunk</h4>
                            <ul className="list-disc pt-2 mb-8">
                                <li>Ajánlott programok - programok testre szabása</li>
                                <li>Pályázat elkészítése, program és pénzügyi tervezet összeállítása</li>
                                <li>Segítség nyújtás a pályázat beadásánál</li>
                                <li>Szálláshely szervezése, biztosítása</li>
                                <li>Étkezés szervezése, biztosítása</li>
                                <li>Idegenvezető, és igény szerint Honismereti vezető kíséri végig a csoportot</li>
                                <li>Biztosítás kötése</li>
                                <li>Autóbusz az utazáshoz minden rendeletnek megfelel</li>
                            </ul>
                            <hr />
                            <div className="flex justify-center mt-8">
                                <div className="flex justify-center w-24 h-24 md:w-32 md:h-32 rounded-2xl mb-6 gap-8 text-center">
                                    <img src="/img/hatartalanul/4.jpg" className="rounded-lg object-cover" alt="Határtalanul 4" />
                                    <img src="/img/hatartalanul/5.jpg" className="rounded-lg object-cover" alt="Határtalanul 5" />
                                    <img src="/img/hatartalanul/6.jpg" className="rounded-lg object-cover" alt="Határtalanul 6" />
                                </div>
                            </div>
                            <p className="text-center mt-6">
                                Utasainkat, csoportjainkat a Neoline Kft. autóbuszaival szállítjuk.
                                <a href="https://contibus.hu/" target="_blank" rel="noopener norefereer" className="text-gray-500 block py-2">
                                    https://contibus.hu/
                                </a>
                                Kérjük, keressenek minket a kalandozas@t-online.hu vagy a buszrendeles@contibus.hu e-mail címeken. <br />
                                Kérjük a rövid határidők miatt mihamarabb jelentkezzenek.
                                <br />
                            </p>
                            <p className="pt-2 text-center">
                                <small>Bízunk benne, hogy újra utasaink között üdvözölhetjük Önöket!</small>
                            </p>
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

export default ModalHatartalanul;
