import { getBaseUrl } from '@/lib/apiConfig.js/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const baseUrl = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
    endpoints: (builder) => ({}),
    tagTypes: [
        'product',
        'category',
        'banner',
        'user',
        'order'
    ]
});