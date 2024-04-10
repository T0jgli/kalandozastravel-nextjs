import React, { useState } from "react";
import logger from "../../lib/helpers/Logger";

import Loading from "../GlobalComponents/Loading";
import { toast } from "react-toastify";
import CustomInputField from "./CustomInputField";
import { event } from "../../lib/helpers/gtag";
import { HiOutlineExclamation } from "react-icons/hi";

const initialInputValue = {
    name: "",
    city: "",
    address: "",
    postalCode: "",
    phone: "",
    email: "",
    matesNames: "",
    people: 1,
    needseat: false,
    needinsurance: false,
    needfelpanzioOrBreakfast: false,
    seatNumber: "",
    feedback: 0,
    desc: "",
    newsletter: false,
    accept: false,
    feedback: 0,
    payment: 0,
    insurances: {},
};

const getErrorMessage = (array, field) => {
    if (array.length === 0) return;

    const index = array?.findIndex((er) => er.path === field);

    if (index === -1) return;

    return <span>{array[index]?.msg}</span>;
};

const isWrongField = (array, field) => array?.findIndex((er) => er.path === field) !== -1;

const Inputs = ({ travel }) => {
    const [state, setState] = useState(initialInputValue);
    const [errors, setErrors] = useState(false);
    const [loading, setloading] = useState(false);

    const onInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        let responseData;
        try {
            setloading(true);

            const response = await fetch(`${typeof window !== "undefined" && window?.location.origin}/api/passengers/ticketorder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*",
                },
                body: JSON.stringify({
                    ...state,
                    travel: {
                        id: travel?.id,
                        title: travel?.title,
                        freePlaces: travel?.freePlaces,
                        startingDate: travel?.startingDate,
                        endingDate: travel?.endingDate,
                        price: travel?.price,
                        extraFelpanzio: travel?.extraFelpanzio,
                    },
                }),
            });

            try {
                responseData = await response.json();
            } catch (error) {
                return toast.error(response?.statusText);
            }

            if (responseData.status === "success") {
                setState(initialInputValue);
                event("jegyfoglalás", {
                    success: true,
                    event_name: "jegyfoglalás",
                });
                setErrors(false);
                toast.success("Sikeresen elküldve. Munkatársunk hamarosan felveszi Önnel a kapcsolatot!");
                return;
            }

            if (responseData.error) {
                toast.error(responseData.error);
                return;
            }

            if (responseData.errors) {
                const element = document.getElementById("travelinput");
                const yOffset = -80;

                const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

                window.scrollTo({ top: y, behavior: "smooth" });
                console.log(responseData.errors);
                toast.error("Kérjük töltse ki a szükséges mezőket!");
                setErrors(responseData.errors);
                return;
            }
        } catch (error) {
            toast.error("Hiba történt a küldés során");

            logger("error", error);
        } finally {
            setloading(false);
        }
    };

    if (!travel) {
        return (
            <div className="text-center my-8">
                <p className="text-xl text-gray-700">Az utazás nem található!</p>
            </div>
        );
    }

    if (travel?.freePlaces === 0) {
        return (
            <div className="text-center my-8">
                <p className="text-xl text-gray-700">Sajnos az utazásra minden hely elfogyott!</p>
            </div>
        );
    }

    if (new Date() >= new Date(travel?.startingDate)) {
        return (
            <div className="text-center my-8">
                <p className="text-xl text-gray-700">Sajnos az utazásra már nem lehet jegyet foglalni!</p>
            </div>
        );
    }

    if (travel?.type2 === "Jelentkezés lezárult") {
        return (
            <div className="text-center my-8">
                <p className="text-xl text-gray-700">Sajnos az utazásra már nem lehet jegyet foglalni!</p>
            </div>
        );
    }

    return (
        <style>
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            }
        </style>
        <div className="flex flex-col max-w-7xl mb-10 mx-auto" id="ticket">
            <form className="shadow-md bg-white rounded-2xl px-8 pt-6 pb-8 mb-4" onSubmit={formSubmit} id="travelinput">
                <div className="mb-10 flex-col md:flex-row flex w-full justify-center items-center">
                    <div className="w-full mb-5 md:mb-0 md:mr-10 relative">
                        <CustomInputField
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "name") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            type="text"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            required
                            name="name"
                            id="name"
                            value={state.name}
                            label="Teljes hivatalos név *"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                    <div className="w-full relative">
                        <CustomInputField 
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "postalCode") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            type="number"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            required
                            <!-- maxlength doesnt work with type number -->
                            maxLength="6"
                            name="postalCode"
                            id="postalCode"
                            value={state.postalCode}
                            label="Irányítószám *"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                </div>
                <div className="mb-10 flex-col md:flex-row flex w-full justify-center pb-10 items-center border-b-2 border-gray-100">
                    <div className="w-full mb-5 md:mb-0 md:mr-10 relative">
                        <CustomInputField
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "city") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            type="text"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            required
                            name="city"
                            id="city"
                            value={state.city}
                            label="Város *"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                    <div className="w-full relative">
                        <CustomInputField
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "address") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            type="text"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            required
                            name="address"
                            id="address"
                            value={state.address}
                            label="Utca, házszám *"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                </div>
                <div className="mb-10 flex-col md:flex-row flex w-full justify-center items-center">
                    <div className="w-full mb-5 md:mb-0 mr-0 md:mr-10 relative">
                        <CustomInputField
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "phone") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            type="text"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            required
                            name="phone"
                            id="phone"
                            value={state.phone}
                            label="Telefonszám *"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                    <div className="w-full relative">
                        <CustomInputField
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "email") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            type="email"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            required
                            name="email"
                            id="email"
                            value={state.email}
                            label="Email cím *"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                </div>
                <div className="mb-10 flex flex-col md:flex-row w-full justify-center items-center">
                    {parseInt(state?.people) > 1 &&
                        Array.from(Array(parseInt(state?.people - 1) || 0).keys()).map((_, i) => (
                            <div className="w-full mb-5 md:mb-0 mr-0 md:mr-10 relative" key={`utasneve ${i}`}>
                                <CustomInputField
                                    className={`${
                                        errors?.length > 0 && isWrongField(errors, "matesNames") ? "border-red-500" : ""
                                    } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    onChange={(e) => {
                                        const newState = state.matesNames || {};
                                        newState[i] = e.target.value;
                                        setState({
                                            ...state,
                                            matesNames: newState,
                                        });
                                    }}
                                    type="text"
                                    onFocus={(e) => {
                                        if (errors?.length > 0) {
                                            setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                        }
                                    }}
                                    name={`matesNames${i}`}
                                    id={`matesNames${i}`}
                                    value={state.matesNames[i] || ""}
                                    label={`${i + 2}. utas neve`}
                                    errors={errors}
                                    required
                                    isWrongField={isWrongField}
                                    getErrorMessage={getErrorMessage}
                                />
                            </div>
                        ))}
                    <div className="w-full relative">
                        <CustomInputField
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "people") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={(e) => {
                                setState({
                                    ...state,
                                    [e.target.name]: e.target.value,
                                    matesNames: {},
                                });
                            }}
                            type="number"
                            min={1}
                            max={parseInt(travel?.freePlaces || 50)}
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            name="people"
                            id="people"
                            value={state.people}
                            label="Utaslétszám"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                </div>
                {travel.country !== "Magyarország" && (
                    <div
                        className="my-10 flex w-full flex-col border-gray-100 pt-4 justify-center items-center"
                        id="insurancebox"
                        style={{ scrollMarginTop: "80px" }}
                    >
                        <label className="inline-flex items-center text-gray-700 text-sm font-semibold mb-2" htmlFor="needinsurance">
                            <input
                                className="appearance-none checkbox cursor-pointer duration-100 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                                onChange={() => {
                                    setState({ ...state, needinsurance: true });
                                    document.querySelector(`#insurancebox`).scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }}
                                type="radio"
                                name="needinsurance"
                                id="needinsurance"
                                checked={state.needinsurance}
                            />
                            <span className="ml-2"> IGEN kérek biztosítást</span>
                        </label>
                        <label className="inline-flex items-center text-gray-700 text-sm font-semibold mb-2" htmlFor="notneedinsurance">
                            <input
                                className="appearance-none checkbox cursor-pointer duration-100 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                                onChange={() => {
                                    setState({ ...state, needinsurance: false });
                                }}
                                type="radio"
                                name="needinsurance"
                                id="notneedinsurance"
                                checked={!state.needinsurance}
                            />
                            <span className="ml-2"> NEM kérek biztosítást</span>
                        </label>
                        {state.needinsurance && (
                            <>
                                {Array.from(Array(Number(state.people)).keys()).map((_, i) => {
                                    return (
                                        <div className="my-10 flex flex-col md:flex-row gap-8 w-4/6 justify-center items-center">
                                            <div className="w-full mb-5 md:mb-0 mr-0 relative">
                                                <CustomInputField
                                                    className={`${
                                                        errors?.length > 0 && isWrongField(errors, `insurancename${i}`) ? "border-red-500" : ""
                                                    } w-full shadow bg-gray-200 appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                                    onChange={(e) => {
                                                        setState({
                                                            ...state,
                                                            insurances: {
                                                                ...state.insurances,
                                                                [e.target.name]: e.target.value,
                                                            },
                                                        });
                                                    }}
                                                    type="text"
                                                    onFocus={(e) => {
                                                        if (errors?.length > 0) {
                                                            setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                                        }
                                                    }}
                                                    required
                                                    name={`insurancename${i}`}
                                                    id={`insurancename${i}`}
                                                    value={state.insurances[`insurancename${i}`] || ""}
                                                    label={`${i + 1}. utas neve`}
                                                    errors={errors}
                                                    isWrongField={isWrongField}
                                                    getErrorMessage={getErrorMessage}
                                                />
                                            </div>
                                            <div className="w-full mb-5 md:mb-0 mr-0 relative">
                                                <CustomInputField
                                                    className={`${
                                                        errors?.length > 0 && isWrongField(errors, `insurancebirthdate${i}`) ? "border-red-500" : ""
                                                    } w-full shadow bg-gray-200 appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                                    onChange={(e) => {
                                                        setState({
                                                            ...state,
                                                            insurances: {
                                                                ...state.insurances,
                                                                [e.target.name]: e.target.value,
                                                            },
                                                        });
                                                    }}
                                                    type="text"
                                                    onFocus={(e) => {
                                                        if (errors?.length > 0) {
                                                            setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                                        }
                                                    }}
                                                    required
                                                    name={`insurancebirthdate${i}`}
                                                    id={`insurancebirthdate${i}`}
                                                    value={state.insurances[`insurancebirthdate${i}`] || ""}
                                                    label={`${i + 1}. utas születési dátuma`}
                                                    errors={errors}
                                                    isWrongField={isWrongField}
                                                    getErrorMessage={getErrorMessage}
                                                />
                                                <div className="absolute -bottom-7 text-center pt-2">
                                                    <label className="text-gray-700 text-xs">(év, hónap, nap)</label>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                )}

                <div
                    className="my-10 flex w-full flex-col border-gray-100 pt-8 border-t-2 justify-center items-center"
                    id="seatbox"
                    style={{ scrollMarginTop: "80px" }}
                >
                    <p className="mb-8 text-sm text-center">
                        Felár megfizetés vállalása mellett lehetőség nyílik, hogy a kiválaszthassa melyik ülőhelyen szeretnének utazni <br />
                        (Az együtt utazókat és egy felszállási helyen felszállókat természetesen egymás melletti vagy mögötti ülőhelyekre ültetjük.)
                    </p>
                    <label className="inline-flex items-center text-gray-700 text-sm font-semibold mb-2" htmlFor="needseat">
                        <input
                            className="appearance-none checkbox cursor-pointer duration-100 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                            onChange={() => {
                                setState({ ...state, needseat: true });
                                document.querySelector(`#seatbox`).scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                            type="radio"
                            name="needseat"
                            id="needseat"
                            checked={state.needseat}
                        />
                        <span className="ml-2"> IGEN kérek feláras helyjegyet</span>
                    </label>
                    <label className="inline-flex items-center text-gray-700 text-sm font-semibold mb-2" htmlFor="notneedseat">
                        <input
                            className="appearance-none checkbox cursor-pointer duration-100 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                            onChange={() => {
                                setState({ ...state, needseat: false });
                            }}
                            type="radio"
                            name="needseat"
                            id="notneedseat"
                            checked={!state.needseat}
                        />
                        <span className="ml-2"> NEM kérek feláras helyjegyet</span>
                    </label>
                    {state.needseat && (
                        <div className="mx-auto w-4/6 relative">
                            <CustomInputField
                                className={`${
                                    errors?.length > 0 && isWrongField(errors, "seatNumber") ? "border-red-500" : ""
                                } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                onChange={onInputChange}
                                type="text"
                                onFocus={(e) => {
                                    if (errors?.length > 0) {
                                        setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                    }
                                }}
                                required
                                name="seatNumber"
                                id="seatNumber"
                                value={state.seatNumber}
                                label="Ülőhely"
                                errors={errors}
                                isWrongField={isWrongField}
                                getErrorMessage={getErrorMessage}
                            />

                            <div className="text-center pt-2">
                                <label className="text-gray-700 text-xs">
                                    (mindkét busz esetén válassza ki az ülőhelyet) Fix-ülőhely igény (csak felár ellenében kérhető, 1 napos utazás
                                    esetén 2.000 Ft/fő, non-stop vagy 2 napos utazások esetén 2.500 Ft/fő, 3 vagy annál többnapos utazás esetén 5.000
                                    Ft/fő) Kérjük vesszővel elválasztva sorolja fel mely ülőhelyeken szeretnének utazni
                                </label>
                            </div>
                            <div className="text-center pt-2">
                                <label className="text-gray-700 text-xs">(nagyítható)</label>
                            </div>

                            <div className="flex flex-row gap-5 flex-center justify-center mt-5">
                                <a href="/img/busz_50fos.png" className="w-28" target="_blank" rel="noopener norefereer">
                                    <img
                                        loading="lazy"
                                        className="w-28 rounded-lg max-w-md mx-auto object-cover duration-300 cursor-pointer hover:opacity-90 shadow-md"
                                        src="/img/busz_50fos.png"
                                        alt="50 fős busz alaprajz"
                                        title="50 fős busz alaprajz"
                                    />
                                </a>
                                <a href="/img/busz_emeletes.png" className="w-28" target="_blank" rel="noopener norefereer">
                                    <img
                                        loading="lazy"
                                        className="w-28 rounded-lg max-w-md mx-auto object-cover duration-300 cursor-pointer hover:opacity-90 shadow-md"
                                        src="/img/busz_emeletes.png"
                                        alt="Emeletes busz alaprajz"
                                        title="Emeletes busz alaprajz"
                                    />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
                {travel?.extraFelpanzio && (
                    <div className="flex flex-row flex-wrap justify-evenly border-gray-100 pt-8 border-t-2">
                        <div className="my-10 flex flex-col justify-center items-center" id="seatbox" style={{ scrollMarginTop: "80px" }}>
                            <label className="inline-flex items-center text-gray-700 text-sm font-semibold mb-2" htmlFor="needfelpanzioOrBreakfast">
                                <input
                                    className="appearance-none checkbox cursor-pointer duration-100 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                                    onChange={() => {
                                        setState({ ...state, needfelpanzioOrBreakfast: true });
                                    }}
                                    type="radio"
                                    name="needfelpanzioOrBreakfast"
                                    id="needfelpanzioOrBreakfast"
                                    checked={state.needfelpanzioOrBreakfast}
                                />
                                <span className="ml-2">IGEN kérek félpanziós ellátást</span>
                            </label>
                            <label
                                className="inline-flex items-center text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="notneedfelpanzioOrBreakfast"
                            >
                                <input
                                    className="appearance-none checkbox cursor-pointer duration-100 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                                    onChange={() => {
                                        setState({ ...state, needfelpanzioOrBreakfast: false });
                                    }}
                                    type="radio"
                                    name="needfelpanzioOrBreakfast"
                                    id="notneedfelpanzioOrBreakfast"
                                    checked={!state.needfelpanzioOrBreakfast}
                                />
                                <span className="ml-2">CSAK reggelit kérek</span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="my-8 relative flex flex-col w-full border-gray-100 pt-8 border-t-2 justify-center">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="feedback">
                        Honnan hallott irodánkról? *
                    </label>
                    <select
                        name="feedback"
                        id="feedback"
                        value={state.feedback}
                        onChange={onInputChange}
                        onFocus={(e) => {
                            if (errors?.length > 0) {
                                setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                            }
                        }}
                        className={`${
                            errors?.length > 0 && isWrongField(errors, "feedback") ? "border-red-500" : ""
                        } shadow bg-gray-200 border rounded-md w-full mb-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    >
                        <option default value={0}>
                            Kérjük válasszon...
                        </option>
                        <option value={"Közösségi oldal"}>Közösségi oldal</option>
                        <option value={"Ismerős"}>Ismerős</option>
                        <option value={"Metro hirdetés"}>Metro hirdetés</option>
                        <option value={"Kuponos weboldal"}>Kuponos weboldal</option>
                        <option value={"Prospektus"}>Prospektus</option>
                        <option value={"Internetes kereső"}>Internetes kereső</option>
                        <option value={"Hírlevél"}>Hírlevél</option>
                    </select>
                    {errors?.length > 0 && isWrongField(errors, "feedback") && (
                        <span className="absolute bottom-0 right-0 flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                            {getErrorMessage(errors, "feedback")}
                        </span>
                    )}
                </div>
                <div className="my-8 relative flex flex-col w-full border-gray-100 justify-center">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="payment">
                        Fizetési mód *
                    </label>
                    <select
                        name="payment"
                        id="payment"
                        value={state.payment}
                        onChange={onInputChange}
                        onFocus={(e) => {
                            if (errors?.length > 0) {
                                setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                            }
                        }}
                        className={`${
                            errors?.length > 0 && isWrongField(errors, "payment") ? "border-red-500" : ""
                        } shadow bg-gray-200 border rounded-md w-full mb-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    >
                        <option default value={0}>
                            Kérjük válasszon...
                        </option>
                        <option value={"Személyesen"}>Irodánkban (készpénz vagy bankkártya)</option>
                        <option value={"Átutalás"}>Átutalás</option>
                        <option value={"Utalvány"}>Utalvány</option>
                        {travel?.country == "Magyarország" && <option value={"Szép kártya"}>Szép kártya</option>}
                    </select>
                    {errors?.length > 0 && isWrongField(errors, "payment") && (
                        <span className="absolute bottom-0 right-0 flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                            {getErrorMessage(errors, "payment")}
                        </span>
                    )}
                </div>

                <div className="mb-8 flex w-full justify-center border-gray-100 border-t-2 pt-8 items-center">
                    <div className="w-full relative">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="desc">
                            Megjegyzés
                        </label>
                        <textarea
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "desc") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            rows={8}
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            name="desc"
                            id="desc"
                            value={state.desc}
                        />
                        {errors?.length > 0 && isWrongField(errors, "desc") && (
                            <span className="absolute -bottom-5 right-0 flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                                {getErrorMessage(errors, "desc")}
                            </span>
                        )}
                    </div>
                </div>
                <div className="mb-5 flex flex-col w-full justify-center items-center">
                    <div className="mb-5">
                        <label className="inline-flex items-center text-gray-700 text-sm font-semibold mb-2" htmlFor="newsletter">
                            <input
                                className="appearance-none hover:opacity-70
                                checkbox cursor-pointer duration-300 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                                onChange={() => {
                                    setState({ ...state, newsletter: !state.newsletter });
                                }}
                                type="checkbox"
                                name="newsletter"
                                id="newsletter"
                                checked={state.newsletter}
                            />
                            <span className="ml-2"> Feliratkozom a hírlevélre</span>
                        </label>
                    </div>
                    <div className="">
                        <label
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "accept") ? "border-red-500 border-2" : ""
                            } inline-flex items-center text-gray-700 text-sm font-semibold p-2 rounded-xl relative`}
                            htmlFor="accept"
                        >
                            <input
                                className="appearance-none hover:opacity-70
                                 checkbox cursor-pointer duration-300 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                                onChange={(e) => {
                                    setState({ ...state, accept: !state.accept });
                                    if (errors?.length > 0) {
                                        setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                    }
                                }}
                                type="checkbox"
                                name="accept"
                                required
                                id="accept"
                                checked={state.accept}
                            />
                            <span className="ml-2">
                                {" "}
                                Elfogadom az{" "}
                                <a
                                    href="/files/adatvedelmi-tajekoztato.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 opacity-90 duration-300 hover:opacity-70"
                                >
                                    {" "}
                                    adatvédelmi tájékoztatót
                                </a>
                            </span>
                            {errors?.length > 0 && isWrongField(errors, "accept") && (
                                <span className="absolute -bottom-5 right-0 flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                                    {getErrorMessage(errors, "accept")}
                                </span>
                            )}
                        </label>
                    </div>
                </div>
                <div className="mt-10 flex w-full flex-col border-gray-100 pt-8 border-t-2 justify-center items-center">
                    <p className="text-sm mb-7">A visszaigazolásokat 1 munkanapon belül a megadott email címre küldjük el.</p>
                    <p className="text-2xl my-4 text-center font-semibold text-gray-600 hover:opacity-80 duration-300">
                        Utazás ára <br className="md:hidden" /> (felárak nélkül):
                    </p>
                    <p className="text-3xl mb-10 text-center font-semibold text-gray-600 hover:opacity-80 duration-300">
                        {travel.price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} Ft
                    </p>
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-yellow-700 cursor-pointer hover:shadow-xl hover:border-yellow-700 border-transparent border-2 hover:bg-white hover:text-yellow-700
                        rounded-2xl focus:outline-none transform duration-300 font-semibold 
                      text-white py-3 px-8"
                    >
                        {loading ? <Loading /> : "Küldés"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Inputs;
