import React from "react";

function Button({
    children, //any button text
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
}){
    return(
        <button className={`py-2 px-4 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
            {children}
        </button>
    )
}

export default Button