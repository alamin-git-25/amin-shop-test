import { baseUrl } from "./baseUrl"

const userApi = baseUrl.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (data) => ({
                url: "/auth/makeUser",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/auth/makeUser/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["user"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/auth/makeUser/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"]
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "/auth/makeUser",
            }),
            providesTags: ["user"]
        })
    })
});
export const {
    useCreateUserMutation,
    useDeleteUserMutation,
    useGetAllUserQuery,
    useUpdateUserMutation
} = userApi;