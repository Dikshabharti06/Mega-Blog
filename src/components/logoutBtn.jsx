import React from "react";
import {useDispatch} from 'react-redux'
import authservice from '../appwrite/auth'
import {logout} from '../store/authSlice'

function LogoutBtn(){
    const dispatch = useDispatch();
    const LogoutHandler=()=>{
        authservice.logout().then(()=>{
            dispatch(logout())
        })
    }
    return(
        <button
        className="inline-block px-2 py-6 duration-200 hover:bg-blue-200 rounded-full"
        onClick={()=>(LogoutHandler())}>Logout</button>
    )
}
export default LogoutBtn