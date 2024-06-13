import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import folderReducer from "./slices/folderSlice";
import documentReducer from "./slices/documentSlice";
import { apiSlice } from "./api-slices/apiSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        folders: folderReducer,
        documents: documentReducer,
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
