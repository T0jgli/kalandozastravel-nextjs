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
    seatNumber: "",
    feedback: 0,
    desc: "",
    newsletter: false,
    accept: false,
    feedback: 0,
    payment: 0,
};

const getErrorMessage = (array, field) => {
    if (array.length === 0) return;

    const index = array?.findIndex((er) => er.param === field);

    if (index === -1) return;

    return <span>{array[index]?.msg}</span>;
};

const isWrongField = (array, field) => array?.findIndex((er) => er.param === field) !== -1;

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
        try {
            setloading(true);

            const response = await fetch(`${typeof window !== "undefined" && window?.location.origin}/api/passengers/ticketorder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*",
                    "User-Agent": "*",
                },
                body: JSON.stringify({
                    ...state,
                    travel: {
                        id: travel.id,
                        title: travel.title,
                        freePlaces: travel.freePlaces,
                        startingDate: travel.startingDate,
                        endingDate: travel.endingDate,
                        price: travel.price,
                    },
                }),
            });

            const responseData = await response.json();

            if (responseData.status === "success") {
                setState(initialInputValue);
                event("jegyfoglal??s", "userInput", "jegyfoglal??s", "sikeres");
                toast.success("Sikeresen elk??ldve. Munkat??rsunk hamarosan felveszi ??nnel a kapcsolatot!");
                return;
            }

            if (responseData.error) {
                toast.error(responseData.error);
                return;
            }

            if (responseData.errors) {
                document.getElementById(responseData.errors[0].param).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                console.log(responseData.errors);
                setErrors(responseData.errors);
                return;
            }
        } catch (error) {
            toast.error("Hiba t??rt??nt a k??ld??s sor??n");

            logger("error", error);
        } finally {
            setloading(false);
        }
    };

    if (travel.freePlaces === 0) {
        return (
            <div className="text-center my-8">
                <p className="text-xl text-gray-700">Sajnos az utaz??sra minden hely elfogyott!</p>
            </div>
        );
    }

    if (new Date() >= new Date(travel.startingDate)) {
        return (
            <div className="text-center my-8">
                <p className="text-xl text-gray-700">Sajnos az utaz??sra m??r nem lehet jegyet foglalni!</p>
            </div>
        );
    }

    if (travel.type2 === "Jelentkez??s lez??rult") {
        return (
            <div className="text-center my-8">
                <p className="text-xl text-gray-700">Sajnos az utaz??sra m??r nem lehet jegyet foglalni!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col max-w-7xl mb-10 mx-auto" id="ticket">
            <form className="shadow-md bg-white rounded-2xl px-8 pt-6 pb-8 mb-4" onSubmit={formSubmit}>
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
                            label="N??v *"
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
                            type="text"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            required
                            maxLength="6"
                            name="postalCode"
                            id="postalCode"
                            value={state.postalCode}
                            label="Ir??ny??t??sz??m *"
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
                            label="V??ros *"
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
                            label="Utca, h??zsz??m *"
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
                            label="Telefonsz??m *"
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
                            type="text"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            required
                            name="email"
                            id="email"
                            value={state.email}
                            label="Email c??m *"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                </div>
                <div className="mb-10 flex flex-col md:flex-row w-full justify-center items-center">
                    <div className="w-full mb-5 md:mb-0 mr-0 md:mr-10 relative">
                        <CustomInputField
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "matesNames") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            type="text"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            name="matesNames"
                            id="matesNames"
                            value={state.matesNames}
                            label="Utast??rs/utast??rsak neve"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                    <div className="w-full relative">
                        <CustomInputField
                            className={`${
                                errors?.length > 0 && isWrongField(errors, "people") ? "border-red-500" : ""
                            } shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            onChange={onInputChange}
                            type="number"
                            onFocus={(e) => {
                                if (errors?.length > 0) {
                                    setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                                }
                            }}
                            name="people"
                            id="people"
                            value={state.people}
                            label="Utasl??tsz??m"
                            errors={errors}
                            isWrongField={isWrongField}
                            getErrorMessage={getErrorMessage}
                        />
                    </div>
                </div>
                <div className="my-10 flex w-full flex-col border-gray-100 pt-8 border-t-2 justify-center items-center">
                    <p className="mb-8 text-sm text-center">
                        Fel??r megfizet??s v??llal??sa mellett lehet??s??g ny??lik, hogy a kiv??laszthassa melyik ??l??helyen szeretn??nek utazni <br />
                        (Az egy??tt utaz??kat ??s egy felsz??ll??si helyen felsz??ll??kat term??szetesen egym??s melletti vagy m??g??tti ??l??helyekre ??ltetj??k.)
                    </p>
                    <label className="inline-flex items-center text-gray-700 text-sm font-semibold mb-2" htmlFor="needseat">
                        <input
                            className="appearance-none checkbox cursor-pointer duration-100 inline-block align-middle flex-shrink-0 border-2 rounded-lg h-5 w-5 text-orange-600"
                            onChange={() => {
                                setState({ ...state, needseat: true });
                            }}
                            type="radio"
                            name="needseat"
                            id="needseat"
                            checked={state.needseat}
                        />
                        <span className="ml-2"> IGEN k??rek fel??ras helyjegyet</span>
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
                        <span className="ml-2"> NEM k??rek fel??ras helyjegyet</span>
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
                                label="??l??hely"
                                errors={errors}
                                isWrongField={isWrongField}
                                getErrorMessage={getErrorMessage}
                            />

                            <div className="text-center pt-2">
                                <label className="text-gray-700 text-xs">
                                    (mindk??t busz eset??n v??lassza ki az ??l??helyet) Fix-??l??hely ig??ny (csak fel??r ellen??ben k??rhet??, 1 napos utaz??s
                                    eset??n 1.000 Ft/f??, 2-3 napos utaz??sok eset??n 2.500 Ft/f??, 4 vagy ann??l t??bbnapos utaz??s eset??n 5.000 Ft/f??)
                                    K??rj??k vessz??vel elv??lasztva sorolja fel mely ??l??helyeken szeretn??nek utazni :
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <div className="my-8 relative flex flex-col w-full border-gray-100 pt-8 border-t-2 justify-center">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="feedback">
                        Honnan hallott irod??nkr??l? *
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
                            K??rj??k v??lasszon...
                        </option>
                        <option value={"K??z??ss??gi oldal"}>K??z??ss??gi oldal</option>
                        <option value={"Ismer??s"}>Ismer??s</option>
                        <option value={"Metro hirdet??s"}>Metro hirdet??s</option>
                        <option value={"Kuponos weboldal"}>Kuponos weboldal</option>
                        <option value={"Prospektus"}>Prospektus</option>
                        <option value={"Internetes keres??"}>Internetes keres??</option>
                        <option value={"H??rlev??l"}>H??rlev??l</option>
                    </select>
                    {errors?.length > 0 && isWrongField(errors, "feedback") && (
                        <span className="absolute bottom-0 right-0 flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                            {getErrorMessage(errors, "feedback")}
                        </span>
                    )}
                </div>
                <div className="my-8 relative flex flex-col w-full border-gray-100 justify-center">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="payment">
                        Fizet??si m??d *
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
                            K??rj??k v??lasszon...
                        </option>
                        <option value={"K??szp??nz"}>K??szp??nz</option>
                        <option value={"Bankk??rtya"}>Bankk??rtya</option>
                        <option value={"??tutal??s"}>??tutal??s</option>
                        <option value={"Utalv??ny"}>Utalv??ny</option>
                        {travel?.country == "Magyarorsz??g" && <option value={"Sz??p k??rtya"}>Sz??p k??rtya</option>}
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
                            Megjegyz??s
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
                                name="accept"
                                id="newsletter"
                                checked={state.newsletter}
                            />
                            <span className="ml-2"> Feliratkozom a h??rlev??lre</span>
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
                                    adatv??delmi t??j??koztat??t
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
                    <p className="text-sm mb-7">A visszaigazol??sokat 1 munkanapon bel??l a megadott email c??mre k??ldj??k el.</p>
                    <p className="text-2xl my-4 text-center font-semibold text-gray-600 hover:opacity-80 duration-300">
                        Utaz??s ??ra <br className="md:hidden" /> (fel??rak n??lk??l):
                    </p>
                    <p className="text-3xl mb-10 text-center font-semibold text-gray-600 hover:opacity-80 duration-300">
                        {travel.price.toLocaleString("hu-HU")} Ft
                    </p>
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-yellow-700 cursor-pointer hover:shadow-xl hover:border-yellow-700 border-transparent border-2 hover:bg-white hover:text-yellow-700
                        rounded-2xl focus:outline-none transform duration-300 font-semibold 
                      text-white py-3 px-8"
                    >
                        {loading ? <Loading /> : "K??ld??s"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Inputs;
