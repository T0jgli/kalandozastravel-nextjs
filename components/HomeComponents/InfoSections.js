const InfoSections = () => {
    return (
        <>
            <div className=" mx-auto mt-24 flex justify-center relative">
                <a href="/img/ingyen.jpg" target="_blank" rel="noopener noreferrer">
                    <button
                        className={`bg-yellow-700 cursor-pointer hover:shadow-xl hover:border-yellow-700 border-transparent 
                        border-2 hover:bg-white hover:text-yellow-700 mx-6 rounded-2xl 
                        focus:outline-none transform duration-300 font-semibold text-white p-3`}
                    >
                        Utazzon ingyen
                    </button>
                </a>
                <a
                    href="https://www.youtube.com/channel/UCCCKnOOaQx-nmAT9YYov6xg/videos"
                    className="hidden"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        className={`bg-yellow-700 cursor-pointer hover:shadow-xl 
                        hover:border-yellow-700 border-transparent border-2 hover:bg-white hover:text-yellow-700 mx-6 
                        rounded-2xl focus:outline-none transform duration-300  font-semibold text-white p-3`}
                    >
                        Videók
                    </button>
                </a>
            </div>

            <div className="relative px-3 2xl:px-0 xl:mb-0 flex my-32">
                <div className="flex flex-wrap max-w-7xl items-center mx-auto flex-1 justify-center">
                    <img
                        src="/img/svgs/travel1.svg"
                        alt="Utazás SVG 1"
                        className="mx-auto w-3/6 xl:mb-0 xl:w-1/4 mt-10 md:mt-0 order-last md:order-first"
                    />
                    <div className="max-w-xl">
                        <h2 className="text-xl font-medium mb-10 tracking-wide">
                            Csapatunk több mint 20 éves tapasztalattal, családias hangulattal várja Önöket.
                        </h2>
                        <p className="text-gray-500">
                            Bízunk benne, hogy a nehéz gazdasági helyzet ellenére mindenki megtalálja programjaink között az igényének, pénztárcájának
                            megfelelő kirándulást, nyaralást, rendezvényt. Honlapunkon láthatja, hogy palettánkat bővítettük, színesítettük, de
                            ragaszkodván a tradíciókhoz, továbbra is indítjuk a már megszokott városlátogatásokat, körutazásokat, tengerparti
                            üdüléseket, nyaralásokat.
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative px-3 2xl:px-0 xl:mb-0 flex my-32 pb-20">
                <div className="flex flex-wrap max-w-7xl items-center mx-auto flex-1 justify-center">
                    <div className="max-w-xl">
                        <h2 className="text-xl font-medium mb-10 tracking-wide">Autóbuszok bérbeadásával is foglalkozunk</h2>
                        <p className="text-gray-500">
                            Cégünk autóbuszok bérbeadásával is foglalkozik, melynek feltételeiről az autóbuszbérlés menüpontban tájékozódhatnak Bízunk
                            benne, hogy törzsutasaink mellett nagyon sok új utastársat köszönthetünk idén is útjaink során. Reméljük, hogy minden
                            kedves utasunk kellemes, új élményekkel tér haza a kiválasztott útról és nyugodt szívvel ajánlja barátainak, ismerőseinek
                            irodánkat.
                        </p>
                    </div>
                    <img
                        src="/img/svgs/travel2.svg"
                        alt="Utazás SVG 2"
                        className="mx-auto w-3/6 xl:mb-0 xl:w-1/4 mb-10 md:mb-0 order-first md:order-last"
                    />
                </div>
            </div>
        </>
    );
};

export default InfoSections;
