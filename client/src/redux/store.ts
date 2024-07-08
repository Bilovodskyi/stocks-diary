import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import folderReducer from "./slices/folderSlice";
import documentReducer from "./slices/documentSlice";
import recordReducer from "./slices/recordSlice";
import sideNavSlice from "./slices/sideNavSlice";
import { apiSlice } from "./api-slices/apiSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        folders: folderReducer,
        documents: documentReducer,
        records: recordReducer,
        nav: sideNavSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
