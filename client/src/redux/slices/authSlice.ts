import { createSlice } from "@reduxjs/toolkit";

type userState = {
    userInfo: {
        _id: string;
        name: string;
        email: string;
    } | null;
};

const getInitialState = () => {
    const storedValue = localStorage.getItem("userInfo");
    if (storedValue) {
        try {
            return JSON.parse(storedValue);
        } catch (err) {
            console.log("Failed to parse localStorage value", err);
            return null;
        }
    }
    return null;
};

const initialState: userState = {
    userInfo: getInitialState(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
