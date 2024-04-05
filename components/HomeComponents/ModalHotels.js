import React, { useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

const ModalHotels = ({ hotelsModal, setHotelsModal }) => {
    const modalRef = useRef(null);
    const modalRef2 = useRef(null);
    const modalRef3 = useRef(null);

    function handleClickOutside(event) {
        if (
            modalRef.current &&
            !modalRef?.current?.contains(event.target) &&
            !modalRef2?.current?.contains(event.target) &&
            !modalRef3.current?.contains(event.target)
        ) {
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
            aria-label="Modal"
        >
            <div
                className={`relative overflow-hidden block max-w-6xl h-auto w-full mx-2 md:mx-auto my-10 z-50 rounded-2xl shadow-xl transform duration-500 ease-out ${
                    hotelsModal?.open ? "opacity-100 top-0 " : "opacity-0 -top-96"
                }`}
            >
                <div className="absolute overflow-hidden shadow-sm flex z-50 justify-between mx-auto w-full items-center rounded-2xl bg-white top-0 left-0 p-5 h-20 ">
                    <p className="text-xl font-medium text-gray-700">Európai szállások</p>
                    <HiOutlineX className="modalcloseicon cursor-pointer text-2xl" onClick={closeModal} />
                </div>
                <div className="flex-1 bg-white rounded-2xl mt-24 p-8" ref={modalRef3} style={{ wordBreak: "break-word" }}>
                    <div className="text-center pb-6">
                        <p className="pb-3">
                            Berlin, a német főváros rendkívül sokszínű látnivalóival, gazdag kulturális életével, valamint élénk és egyben laza
                            életstílusával várja az oda látogatókat A történelmi építmények és kortárs építészet, valamint a tradíció és modernség
                            közötti ellentét az, ami megkülönbözteti ezt a várost. A berlini nevezetességek egy teljes nemzet történelmét mesélik el a
                            Brandenburgi Kaputól egészen a Szövetségi Kancellári Hivatalig.
                        </p>
                        <p className="pb-3">
                            A német fővárosban található az összes nagy kormányzati épület, köztük a történelmi Reichstag, mint a német parlament
                            székháza. Berlin a művészetek, a művészek és a múzeumok városa. Több mint 170 múzeum - köztük a világhírű Múzeum sziget -
                            mutatják be a világ kincseit. Jeles zenekarok - mint a nemzetközi hírnévnek örvendő Berlini Filharmonikusok - és a három
                            nagy operaház szenzációs opera és balett előadásaikkal teszik Berlint a klasszikus stílus világ minden tájáról érkező
                            szerelmeseinek Eldorádójává. A számos színház, varieté, revüszínház és rengeteg kabaré gondoskodik a minden ízlést
                            kielégítő szórakoztatásról. Számtalan vásárlási lehetőséget kínál a híres Kurfürstendamm, az elegáns Friedrichstraße és az
                            eredeti butikok a Hackesche Höfe körül. Folyamatos változás jellemzi az élénk, energiától túlfűtött metropoliszt.
                        </p>
                    </div>
                    <hr />
                    <p className="text-gray-600 pt-6 font-medium">Látnivalók Berlinben:</p>
                    <ul className="mt-6 list-disc">
                        <li>
                            Unter den Linden - Az Unter den Linden (A hársak alatt) Berlin egyik leghíresebb utcája. A hársfákkal szegélyezett út
                            korábban a fejedelmi család kastélyát kötötte össze a vadászterülettel.
                        </li>
                        <li>
                            Reichstag - A Berlin központjában található Reichstag a német múlt, jelen és jövő szimbóluma. A több mint 200 éves épület
                            1990 óta újra a törvényhozás székhelye.
                        </li>
                        <li>
                            Brandenburger Tor - Németországban nem sokan gondolnak építésztörténeti jelentőségére, hisz a nép kettészakadásának és
                            újraegyesítésének szimbólumaként hatalmas érzelmi jelentőséggel bír.
                        </li>
                        <li>
                            Fernsehturm - A 365 méter magas berlini torony és az üveggömbje a belváros szinte minden kerületéből jól látható. A
                            berlini Tévétorony egyik szenzációja a körbeforgó kávézó. Egy teljes fordulat kb. fél óráig tart, így madártávlatból
                            szemlélhetjük a várost kávénkat szürcsölgetve. Jó időben akár 40 kilométerre is elláthatunk.
                        </li>
                        <li>
                            Gendarmenmarkt - A Gendarmenmarkt-ot a XIII. és a XIX. századi épületeivel a város legszebb, leghangulatosabb terének
                            mondják.
                        </li>
                        <li>
                            Marienkirche - A Mária templomot kora gótikus csarnoka és pazar díszítése az egyik legérdekesebb templommá teszi
                            Berlinben.
                        </li>
                        <li>
                            Museuminsel - A hosszú Museuminsel, amely a Spree mellékfolyói között húzódik, Berlin történelmének bölcsője. Berlin 5
                            múzeuma a világ minden tájáról vonzza a látogatókat.
                        </li>
                        <li>
                            Schloss Charlottenburg - A Charlottenburgi Kastély Berlin legnagyobb, épen maradt kastélya a barokk építészet egyik
                            legszebb példája. A kastély Kincs- és Ezüsttára megyés kincseket rejt.
                        </li>
                        <li>
                            Siegessäule - A győzelmi oszlop Berlin egyik legjelentősebb jelképe. Az oszlopot J. Heinrich Strack készíttette a porosz
                            hadsereg Dánia felett aratott 1864-es győzelmének emlékére.
                        </li>
                    </ul>
                </div>
                <div className="mt-12 md:mx-5 flex flex-wrap justify-between gap-8">
                    <div ref={modalRef} className="mx-auto lg:mx-0">
                        <div className="relative w-96 h-80 overflow-hidden rounded-t-2xl">
                            <img
                                loading="lazy"
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
                                <img
                                    loading="lazy"
                                    src="/img/berlin/hotel_mondai_1.jpg"
                                    className="rounded-lg object-cover"
                                    alt="Hotel Mondial galéria 1"
                                />
                                <img
                                    loading="lazy"
                                    src="/img/berlin/hotel_mondai_2.jpg"
                                    className="rounded-lg object-cover"
                                    alt="Hotel Mondial galéria 2"
                                />
                            </div>
                        </div>
                    </div>
                    <div ref={modalRef2} className="mx-auto lg:mx-0">
                        <div className="relative w-96 h-80 overflow-hidden rounded-t-2xl">
                            <img
                                loading="lazy"
                                src={"/img/berlin/hotel_park_inn_base.jpg"}
                                className="object-cover absolute top-0 duration-300 rounded-t-2xl w-96 h-80 transform hover:scale-105"
                                alt="Hotel Park Inn Radisson fő kép"
                            />
                        </div>

                        <div className="bg-white h-auto w-96 rounded-b-2xl flex flex-col items-center justify-center">
                            <h3 className="text-center text-2xl my-6">Hotel Park Inn Radisson</h3>
                            <div className="flex justify-center w-28 h-28 rounded-2xl mb-6 gap-8">
                                <img
                                    loading="lazy"
                                    src="/img/berlin/hotel_park_inn_1.jpg"
                                    className="rounded-lg object-cover"
                                    alt="Hotel Park Inn Radisson galéria 1"
                                />
                                <img
                                    loading="lazy"
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
