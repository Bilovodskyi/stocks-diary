import { createSlice } from "@reduxjs/toolkit";

type documentState = {
    documents: MyDocumentType[];
};

const initialState: documentState = {
    documents: [],
};

const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        setInitialDocuments: (state, action) => {
            state.documents = action.payload;
        },
        createNewDocument: (state, action) => {
            state.documents.push(action.payload);
        },
        changeLocalDocumentName: (state, action) => {
            const { id, newName } = action.payload;
            const doc = state.documents?.find((doc) => doc._id === id);
            if (doc) {
                doc.name = newName;
            }
        },
        changeLocalDocumentStartCapital: (state, action) => {
            const { id, startCapital } = action.payload;
            const doc = state.documents?.find((doc) => doc._id === id);
            if (doc) {
                doc.startCapital = startCapital;
            }
        },
        deleteLocalDocument: (state, action) => {
            let newArray = state.documents
                .filter((doc) => doc._id !== action.payload)
                .filter((doc) => doc.parent !== action.payload);
            if (newArray) {
                state.documents = newArray;
            }
        },
    },
});

export const {
    setInitialDocuments,
    createNewDocument,
    changeLocalDocumentName,
    changeLocalDocumentStartCapital,
    deleteLocalDocument,
} = documentSlice.actions;

export default documentSlice.reducer;
