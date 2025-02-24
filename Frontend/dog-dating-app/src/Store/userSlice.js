import { createSlice } from "@reduxjs/toolkit";


const initialState ={

    userData: null,
    isLoggedIn: false
}

const userSlice = createSlice({

    name:'user',
    initialState,
    reducers:{

        login:(state, action)=>{

            state.userData = action.payload;
            state.isLoggedIn = true;
        },
        logout:(state)=>{

            state.userData = null
            state.isLoggedIn = false
        }
    }

})

export const {login, logout}= userSlice.actions
export default userSlice.reducer // export reducer