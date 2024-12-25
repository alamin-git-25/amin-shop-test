import { baseUrl } from "./baseUrl"

const categoryApi = baseUrl.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: 'category',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["category"]
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/category/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["category"]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["category"]
        }),
        getAllCategory: builder.query({
            query: () => ({
                url: '/category'
            }),
            providesTags: ["category"]
        })
    })
});
export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery,
    useUpdateCategoryMutation
} = categoryApi;