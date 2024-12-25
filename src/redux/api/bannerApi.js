import { baseUrl } from "./baseUrl"

const bannerApi = baseUrl.injectEndpoints({
    endpoints: (builder) => ({
        createBanner: builder.mutation({
            query: (formData) => ({
                url: "/banner",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["banner"]
        }),
        updateBanner: builder.mutation({
            query: ({ id, ...status }) => ({
                url: `/banner/${id}`,
                method: "PUT",
                body: status
            }), invalidatesTags: ["banner"]
        }),
        deleteBanner: builder.mutation({
            query: (publicId) => ({
                url: `/banner/${publicId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['banner']
        }),
        getAllBanner: builder.query({
            query: () => ({
                url: "/banner"
            }),
            providesTags: ["banner"]
        })
    })
});
export const {
    useCreateBannerMutation,
    useDeleteBannerMutation,
    useGetAllBannerQuery,
    useUpdateBannerMutation
} = bannerApi;