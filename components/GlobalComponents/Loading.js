import React from "react";
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("react-loader-spinner"));

const Loading = () => {
    return <Loader type="TailSpin" color="whitesmoke" width={30} height={30} />;
};

export default Loading;
