import { apiSlice } from "./apiSlice";

const FOLDERS_URL = "/api/folder";

export const folderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFolders: builder.mutation({
            query: (data) => ({
                url: `${FOLDERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        createFolder: builder.mutation({
            query: (data) => ({
                url: `${FOLDERS_URL}/create`,
                method: "POST",
                body: data,
            }),
        }),
        updateFolderName: builder.mutation({
            query: (data) => ({
                url: `${FOLDERS_URL}`,
                method: "PUT",
                body: data,
            }),
        }),
        // getAllDocuments: builder.mutation({
        //     query: (data) => ({
        //         url: `${FOLDERS_URL}`,
        //         method: "POST",
        //         body: data,
        //     }),
        // }),
        deleteFolder: builder.mutation({
            query: (data) => ({
                url: `${FOLDERS_URL}`,
                method: "DELETE",
                body: data,
            }),
        }),

        // updateUser: builder.mutation({
        //     query: (data) => ({
        //         url: `${USERS_URL}/profile`,
        //         method: "PUT",
        //         body: data,
        //     }),
        // }),
    }),
});

export const {
    useGetAllFoldersMutation,
    useCreateFolderMutation,
    useUpdateFolderNameMutation,
    // useGetAllDocumentsMutation,
    useDeleteFolderMutation,
    // useUpdateUserMutation,
} = folderApiSlice;
