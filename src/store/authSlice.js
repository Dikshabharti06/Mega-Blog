import { createSlice } from "@reduxjs/toolkit";
import { todoSlice } from "../../../11reduxtoolkit/src/features/tools/todoSlice";
const initialState={
    status: false,
    userData:null
}
const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state, action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        }
    }
});

export const {login, logout}= authSlice.actions; 
export default authSlice.reducer;