import { createSlice } from "@reduxjs/toolkit";

type recordsState = {
    records: RecordType[];
};

const initialState: recordsState = {
    records: [],
};

const recordsSlice = createSlice({
    name: "records",
    initialState,
    reducers: {
        setInitialLocalRecords: (state, action) => {
            state.records = action.payload;
        },
        createNewLocalRecord: (state, action) => {
            state.records.push(action.payload);
        },

        deleteLocalRecord: (state, action) => {
            let newArray = state.records
                .filter((rec) => rec._id !== action.payload)
                .filter((rec) => rec.parent !== action.payload);
            if (newArray) {
                state.records = newArray;
            }
        },
    },
});

export const {
    setInitialLocalRecords,
    createNewLocalRecord,
    deleteLocalRecord,
} = recordsSlice.actions;

export default recordsSlice.reducer;
