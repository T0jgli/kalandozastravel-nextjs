import React from "react";

const CustomInputField = ({ label, id, isWrongField, getErrorMessage, state, errors, ...restProps }) => {
    return (
        <>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={id}>
                {label}
            </label>
            <input {...restProps} id={id} />
            {errors?.length > 0 && isWrongField(errors, id) && (
                <span className="absolute -bottom-5 right-0 flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                    {getErrorMessage(errors, id)}
                </span>
            )}
        </>
    );
};

export default CustomInputField;
