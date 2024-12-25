import { baseUrl } from "./baseUrl";

const orderApi = baseUrl.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: "/order",
                method: "POST",
                body: orderData, // Headers are optional if set globally in fetchBaseQuery
            }),
            invalidatesTags: ["order"],
        }),
        updateOrder: builder.mutation({
            query: ({ id, ...newStatus }) => ({
                url: `/order/update/${id}`,
                method: "PUT",
                body: newStatus,
            }),
            invalidatesTags: ["order"],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/order/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["order"],
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: "/order", // Ensure this matches your backend route
            }),
            providesTags: ["order"],
        }),
        getOrder: builder.query({
            query: (email) => ({
                url: `/order/${email}`,
            }),
            providesTags: ["order"]
        })
    }),
});

// Export hooks for components to use
export const {
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetAllOrderQuery,
    useGetOrderQuery
} = orderApi;

export default orderApi;
