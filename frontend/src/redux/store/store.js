import { configureStore } from "@reduxjs/toolkit";
import { ResumeSlice } from "../slices/ResumeSlice/ResumeSlices";
import { AuthSlice } from "../slices/AuthSlice/AuthSlice";

const store = configureStore({
  reducer: { resumes: ResumeSlice.reducer, Auth: AuthSlice.reducer },
});

export default store;
