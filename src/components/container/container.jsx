import React from "react";
import LogoutBtn from "../logoutBtn"; 
import Logo from '../Logo'

function Container({Children}){
    return
        <div className="w-full max-w-7xl mx-auto px-4">{Children}</div>;
}
export default Container