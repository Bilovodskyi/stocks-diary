import { createSlice } from "@reduxjs/toolkit";

type folderState = {
    folders: Folder[];
};

const initialState: folderState = {
    folders: [],
};

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {
        setInitialFolders: (state, action) => {
            state.folders = action.payload;
        },
        createNewFolder: (state, action) => {
            // const { id, newFolder } = action.payload;
            // if (state.folders[id]) {
            //     state.folders[id].push(newFolder);
            // }
            state.folders.push(action.payload);
        },
        changeFolderName: (state, action) => {
            const { id, newName } = action.payload;
            const item = state.folders?.find((item) => item._id === id);
            if (item) {
                item.name = newName;
            }
        },
        deleteLocalFolder: (state, action) => {
            // const { id } = action.payload;
            let newArray = state.folders
                .filter((folder) => folder._id !== action.payload)
                .filter((folder) => folder.parent !== action.payload);
            if (newArray) {
                state.folders = newArray;
            }
        },
    },
});

export const {
    setInitialFolders,
    createNewFolder,
    changeFolderName,
    deleteLocalFolder,
} = folderSlice.actions;

export default folderSlice.reducer;
