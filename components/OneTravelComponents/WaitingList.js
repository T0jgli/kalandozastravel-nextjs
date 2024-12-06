import { Suspense, useState } from "react";
import CustomInputField from "./CustomInputField";
import clsx from "clsx";
import logger from "../../lib/helpers/Logger";
import { toast } from "react-toastify";
import Loading from "../GlobalComponents/Loading";
import { getErrorMessage, isWrongField } from "../../lib/helpers/travels";
import { event } from "../../lib/helpers/gtag";

const initialInputValue = {
    name: "",
    phone: "",
    email: "",
};

function WaitingList({ travel }) {
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

            const response = await fetch(`${typeof window !== "undefined" && window?.location.origin}/api/passengers/waitinglist`, {
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
                        startingDate: travel?.startingDate,
                        endingDate: travel?.endingDate,
                        price: travel?.price,
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
                event("várólista", {
                    success: true,
                    event_name: "várólista",
                });
                setErrors(false);
                toast.success("Sikeresen elküldve. Munkatársunk hamarosan felveszi Önnel a kapcsolatot, amint felszabadul hely az utazásra!");
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

    return (
        <Suspense>
            <div className="flex flex-col max-w-7xl mb-10 mx-auto" id="ticket">
                <form className="shadow-md bg-white rounded-2xl px-8 pt-6 pb-8 mb-4" onSubmit={formSubmit} id="travelinput">
                    <div className="mb-10 flex-col md:flex-row flex w-full justify-center items-center">
                        <div className="w-full mb-5 md:mb-0 md:mr-10 relative">
                            <CustomInputField
                                className={clsx(
                                    "shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                    errors?.length > 0 && isWrongField(errors, "name") && "border-red-500"
                                )}
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
                        <div className="w-full mb-5 md:mb-0 md:mr-10 relative">
                            <CustomInputField
                                className={clsx(
                                    "shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                    errors?.length > 0 && isWrongField(errors, "phone") && "border-red-500"
                                )}
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
                                className={clsx(
                                    "shadow bg-gray-200 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                    errors?.length > 0 && isWrongField(errors, "email") && "border-red-500"
                                )}
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
                    <div className="mt-10 flex w-full flex-col border-gray-100 pt-8 border-t-2 justify-center items-center">
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
                            {loading ? <Loading /> : "Jelentkezés a várólistára"}
                        </button>
                    </div>
                </form>
            </div>
        </Suspense>
    );
}

export default WaitingList;
