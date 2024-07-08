import { apiSlice } from "./apiSlice";

const DOCUMENT_URL = "/api/document";

export const documentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createDocument: builder.mutation({
            query: (data) => ({
                url: `${DOCUMENT_URL}/create`,
                method: "POST",
                body: data,
            }),
        }),
        getAllDocuments: builder.mutation({
            query: (data) => ({
                url: `${DOCUMENT_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        getSingleDocument: builder.mutation({
            query: (data) => ({
                url: `${DOCUMENT_URL}/get-single-doc`,
                method: "POST",
                body: data,
            }),
        }),
        changeDocumentName: builder.mutation({
            query: (data) => ({
                url: `${DOCUMENT_URL}`,
                method: "PUT",
                body: data,
            }),
        }),
        changeDocumentStartCapital: builder.mutation({
            query: (data) => ({
                url: `${DOCUMENT_URL}/start-capital`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteDocument: builder.mutation({
            query: (data) => ({
                url: `${DOCUMENT_URL}`,
                method: "DELETE",
                body: data,
            }),
        }),
    }),
});

export const {
    useCreateDocumentMutation,
    useGetAllDocumentsMutation,
    useGetSingleDocumentMutation,
    useChangeDocumentNameMutation,
    useChangeDocumentStartCapitalMutation,
    useDeleteDocumentMutation,
} = documentApiSlice;
