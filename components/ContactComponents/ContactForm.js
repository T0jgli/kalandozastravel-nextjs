import React, { useState } from "react";
import { toast } from "react-toastify";
import { event } from "../../lib/helpers/gtag";
import logger from "../../lib/helpers/Logger";
import Loading from "../GlobalComponents/Loading";
import { HiOutlineExclamation } from "react-icons/hi";

const initialInputValue = {
    name: "",
    subject: "",
    email: "",
    message: "",
};

const getErrorMessage = (array, field) => {
    if (array.length === 0) return;

    const index = array?.findIndex((er) => er.param === field);

    if (index === -1) return;

    return <span>{array[index]?.msg}</span>;
};

const isWrongField = (array, field) => array?.findIndex((er) => er.param === field) !== -1;

const ContactForm = () => {
    const [state, setState] = useState(initialInputValue);
    const [errors, setErrors] = useState([]);
    const [loading, setloading] = useState(false);

    const onInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        if (!state.name || !state.email || !state.message) return toast.error("Kérjük, az összes mezőt töltse ki");

        try {
            setloading(true);
            const response = await fetch(`${window?.location?.origin}/api/passengers/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*",
                    "User-Agent": "*",
                },
                body: JSON.stringify(state),
            });

            const responseData = await response.json();

            if (responseData.status === "success") {
                setState(initialInputValue);
                event("kapcsolat", {
                    success: true,
                    event_name: "kapcsolat",
                });
                toast.success("Sikeresen elküldve. Munkatársunk hamarosan felveszi Önnel a kapcsolatot!");
                return;
            }

            if (responseData.error) {
                toast.error(responseData.error);
                return;
            }

            if (responseData.errors) {
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

    return (
        <div className="mx-auto w-full md:w-6/12">
            <form onSubmit={formSubmit} className="rounded-3xl px-8 pt-6 pb-8 mb-4 shadow-md bg-white" id="contactform">
                <p className="text-2xl font-semibold text-gray-800 text-center my-10">Üzenet küldése</p>

                <div className="mb-10 flex-col flex w-full justify-center items-center">
                    <input
                        className={`${
                            errors?.length > 0 && isWrongField(errors, "name") ? "border-red-500" : ""
                        } shadow-md  rounded-3xl bg-gray-200 appearance-none border w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        onChange={onInputChange}
                        type="text"
                        onFocus={(e) => {
                            if (errors?.length > 0) {
                                setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                            }
                        }}
                        required
                        name="name"
                        placeholder="Név"
                        id="name"
                        value={state.name}
                    />
                    {errors?.length > 0 && isWrongField(errors, "name") && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                            {getErrorMessage(errors, "name")}
                        </span>
                    )}
                </div>
                <div className="mb-10 flex-col flex w-full justify-center items-center">
                    <input
                        className={`${
                            errors?.length > 0 && isWrongField(errors, "email") ? "border-red-500" : ""
                        } shadow-md rounded-3xl bg-gray-200 appearance-none border w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        onChange={onInputChange}
                        type="email"
                        onFocus={(e) => {
                            if (errors?.length > 0) {
                                setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                            }
                        }}
                        required
                        name="email"
                        placeholder="Email cím"
                        id="email"
                        value={state.email}
                    />
                    {errors?.length > 0 && isWrongField(errors, "email") && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                            {getErrorMessage(errors, "email")}
                        </span>
                    )}
                </div>
                <div className="mb-10 flex-col flex w-full justify-center items-center">
                    <textarea
                        className={`${errors?.length > 0 && isWrongField(errors, "message") ? "border-red-500" : ""} shadow-md rounded-3xl 
                        bg-gray-200 appearance-none border w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        onChange={onInputChange}
                        type="text"
                        onFocus={(e) => {
                            if (errors?.length > 0) {
                                setErrors((prev) => prev.filter((er) => er.param !== e.target.name));
                            }
                        }}
                        required
                        rows={6}
                        name="message"
                        placeholder="Üzenet"
                        id="message"
                        value={state.message}
                    />
                    {errors?.length > 0 && isWrongField(errors, "message") && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                            {getErrorMessage(errors, "message")}
                        </span>
                    )}
                </div>
                <div className="my-10 flex-col flex w-full justify-center items-center">
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-yellow-700 w-full cursor-pointer hover:shadow-xl hover:border-yellow-700 border-transparent border-2 hover:bg-white hover:text-yellow-700
                        rounded-2xl focus:outline-none transform duration-300  font-semibold 
                      text-white p-3"
                    >
                        {loading ? <Loading /> : "Küldés"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
