import React from "react";

const ContactInfo = () => {
    return (
        <div className="md:w-6/12 w-full mr-20 text-lg">
            <div className="border-b-2 text-gray-700 border-gray-200">
                <h2 className="pb-10 font-semibold">
                    Ha kérdése van, vagy további információt szeretne bármelyik utazásunkról, kérjük, használja az alábbi kapcsolattartási űrlapot! 24
                    órán belül kapcsolatba lépünk Önnel.
                </h2>
                <p className="pb-10 font-semibold">
                    Fizetési módok:<span className="pl-2 opacity-80">készpénz, bankkártya, átutalás, SZÉP kártya, utalványok</span>
                </p>
            </div>
            <div className="border-b-2 py-10 border-gray-200">
                <div>
                    <div className="pb-10">
                        <span className="text-gray-500 font-semibold">Telefon: </span>
                        <a className="duration-300 text-yellow-700 hover:opacity-80 font-medium" href="tel:+3613171256">
                            +36 1 317-1256
                        </a>
                        ,{" "}
                        <a className="duration-300 text-yellow-700 hover:opacity-80 font-medium" href="tel:+3613171056">
                            +36 1 317-1056
                        </a>
                    </div>
                    <div className="pb-10">
                        <span className="text-gray-500 font-semibold">Email cím:</span>
                        <a href="mailto:kalandozas@t-online.hu" className="duration-300 hover:opacity-80 font-medium">
                            {" "}
                            kalandozas@t-online.hu
                        </a>
                    </div>
                    <div className="pb-5 flex flex-col">
                        <span className="text-gray-500 font-semibold pb-2">Iroda:</span>
                        <a
                            href="https://www.google.com/maps?ll=47.495689,19.062411&z=15&t=m&hl=hu-HU&gl=US&mapclient=embed&q=S%C3%ADp+u.+4+Budapest+1075"
                            className="duration-300 hover:opacity-80 font-medium"
                        >
                            1075 Budapest, Síp utca 4.
                        </a>
                    </div>
                    <div className="pb-10">
                        <span className="text-gray-500 font-semibold pb-2">Nyitvatartás:</span>
                        <span className="font-medium"> H-P 9-17 óráig</span>
                    </div>
                    <div className="">
                        <span className="text-gray-500 font-semibold pb-2">Bankszámlaszámunk:</span>
                        <span className="font-medium"> OTP Bank 11709057-21451690</span>
                    </div>
                </div>
            </div>
            <img
                loading="lazy"
                src="/img/szep_kartya.png"
                alt="Szép kártya kép"
                className="max-w-xs duration-300 hover:opacity-90 mx-auto mt-16 mb-16 md:mb-0"
            />
        </div>
    );
};

export default ContactInfo;
