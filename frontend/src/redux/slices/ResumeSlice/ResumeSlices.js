import { createSlice,createAsyncThunk, createAction } from '@reduxjs/toolkit';





const initialState={
   resumes:{},
    isLogged:false,
    profileDetail:{},
    refresh:false,
    blogRefresh:false
}

export const ResumeSlice=createSlice({
    name:'ResumeData',
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
        setProfile:(state,action)=>{
            state.profileDetail=action.payload
        },
        refreshPage:(state,payload)=>{

            state.refresh=true
        },
        refreshForBlogs:(state,payload)=>{
            state.blogRefresh=!state.blogRefresh
        },
       
    },
  
})

export const {userlogout,refreshForBlogs,setProfile,setLoggin,logOut,refreshPage}=ResumeSlice.actions