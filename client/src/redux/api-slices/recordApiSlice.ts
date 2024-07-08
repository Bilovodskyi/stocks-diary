import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/record";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRecord: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/create`,
                method: "POST",
                body: data,
            }),
        }),
        getAllRecords: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useCreateRecordMutation, useGetAllRecordsMutation } =
    userApiSlice;
