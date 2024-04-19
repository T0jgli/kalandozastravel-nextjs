import React from "react";
import BottomLinks from "./BottomLinks";

const Topbg = () => {
    return (
        <>
            <div className="relative overflow-hidden max-w-screen" style={{ minHeight: "356px" }}>
                <div
                    className="absolute bg-center bg-cover bg-no-repeat p-0 w-full transform duration-300 hover:scale-105"
                    style={{
                        minHeight: "356px",
                        backgroundImage: "url(https://cdn.kalandozas.hu/img/topbg.webp)",
                    }}
                />
            </div>
            <BottomLinks />
            <h1 className="text-center hidden text-2xl md:text-3xl font-medium my-8">Neoline-Kalandozás Utazási Iroda</h1>
        </>
    );
};

export default Topbg;
