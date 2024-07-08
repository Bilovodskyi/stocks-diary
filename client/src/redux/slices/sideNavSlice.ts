import { createSlice } from "@reduxjs/toolkit";

type sideNavState = {
    width: string;
    hidden: string;
};

const initialState: sideNavState = {
    width: "100%",
    hidden: "",
};

const sideNavSlice = createSlice({
    name: "sideNav",
    initialState,
    reducers: {
        setPageWidth: (state, action) => {
            const { newWidth, newHidden } = action.payload;
            state.width = newWidth;
            state.hidden = newHidden;
        },
    },
});

export const { setPageWidth } = sideNavSlice.actions;

export default sideNavSlice.reducer;
