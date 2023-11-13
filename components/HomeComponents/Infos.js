import { Caveat } from "next/font/google";
import React from "react";

const caveat = Caveat({
    weight: ["400", "500"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

const Infos = () => {
    return (
        <div className="my-24 px-3 2xl:px-0">
            <div className="flex flex-wrap max-w-7xl items-center mx-auto flex-1 justify-center">
                <div className="flex flex-wrap text-center w-full justify-evenly">
                    <div className="max-w-xl mb-16 md:mb-0">
                        <div className="text-2xl">
                            <h2 className={`${caveat.className} pb-6 text-yellow-700 font-medium`}>Élmények</h2>
                            <h3 className="font-semibold pb-10">Felejthetetlen utazások</h3>
                        </div>
                        <div className="">
                            <p className="text-gray-500">
                                Színvonalas helyszíneket kínálunk kedves utasainknak, akár belföldi, akár külföldi útról legyen is szó.
                                Megismerkedhetnek gyönyörű hegyvidéki tájakkal, műemlékekben gazdag városokkal, festői tájakkal, a tengerpart
                                varázsával, hazánk és Európa rejtett szegleteivel. Szervezünk budapesti városnézéseket, melyeken fővárosunk egy-egy
                                nevezetességével ismerkedhetnek meg.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-xl">
                        <div className="text-2xl">
                            <h2 className={`${caveat.className} pb-6 text-yellow-700 font-medium`}>Rólunk</h2>
                            <h3 className="font-semibold pb-10">Biztonság, kényelem, színvonal</h3>
                        </div>
                        <div className="">
                            <p className="text-gray-500">
                                Autóbuszparkunkat folyamatosan újítjuk, továbbra is luxus színvonalon utazhatnak kiválasztott úticéljuk felé,
                                létszámtól függően, mikrobusszal, emelt szintű vagy emeletes, kényelmes, minden extrával (légkondicionáló, toalett,
                                dvd) ellátott autóbuszainkon. Bevezettük a konkrét ülőhely foglalását felár ellenében.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Infos;
