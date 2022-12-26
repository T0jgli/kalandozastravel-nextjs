import React, { useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineNewspaper } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";

const initialInputValue = {
    nev: "",
    subject: "",
    email: "",
    message: "",
};

const Newsletter = () => {
    const [state, setState] = useState(initialInputValue);
    const onInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async () => {
        setState(initialInputValue);
    };

    return (
        <div className="py-12 w-full mx-auto bg-white">
            <div className="max-w-7xl mx-auto items-center justify-center flex flex-col gap-10 lg:flex-row lg:gap-20" id="newslettercontainer">
                <div className="flex items-center gap-8 text-gray-700 opacity-85">
                    <HiOutlineNewspaper fontSize="3rem" className="" />
                    <h3 className="text-xl tracking-wide font-medium">Feliratkozás a hírlevélre</h3>
                </div>
                <form
                    className="flex flex-col gap-5 w-full px-10 2xl:px-0 md:w-1/3 items-center"
                    method="POST"
                    target="_blank"
                    action="https://ingyenhirlevel.hu/feliratkozas"
                >
                    <input
                        className={`shadow-md w-full rounded-3xl bg-gray-200 appearance-none border py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="text"
                        required
                        name="nev"
                        placeholder="Név"
                        id="nev"
                        value={state.nev}
                        onChange={onInputChange}
                    />
                    <input type="hidden" value="62b92ec744cd3606695526baced0b89b" name="userid" />
                    <div className="w-full relative rounded-3xl border bg-gray-200 shadow-md">
                        <input
                            className={`w-full rounded-3xl pl-6 appearance-none bg-gray-200 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="email"
                            required
                            name="email"
                            placeholder="Email cím"
                            id="email"
                            value={state.email}
                            onChange={onInputChange}
                        />
                        <button
                            className="cursor-pointer absolute top-1.5 right-2 text-gray-700 focus:outline-none duration-300 hover:opacity-80"
                            type="submit"
                            name="hirlevel"
                            title="Küldés"
                        >
                            <AiOutlineSend fontSize="2rem" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
