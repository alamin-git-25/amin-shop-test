import { baseUrl } from "./baseUrl"

const productApi = baseUrl.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (formData) => ({
                url: '/product',
                method: "POST",
                body: formData
            }),
            invalidatesTags: ['product'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...formData }) => ({
                url: `/product/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ['product']
        }),
        deleteProduct: builder.mutation({
            query: (publicId) => ({
                url: `/product/${publicId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['product']
        }),
        getAllProduct: builder.query({
            query: () => ({
                url: 'product',
            }),
            providesTags: ['product']
        })
    })
});
export const {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetAllProductQuery,
    useUpdateProductMutation
} = productApi;