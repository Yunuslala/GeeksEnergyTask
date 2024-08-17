import { createSlice } from '@reduxjs/toolkit';





const initialState={
    UserLogin:{},
    isLogged:false,
    token:""
}

export const AuthSlice=createSlice({
    name:'UserAuthData',
    initialState,
    reducers:{
        setLoggin:(state,action)=>{
            state.isLogged=true;
            state.UserLogin=action.payload;
        },
        logOut:(state,action)=>{
            state.isLogged=false;
            state.UserLogin={}
        },
      
    },
  
})

export const {setLoggin,logOut}=AuthSlice.actions