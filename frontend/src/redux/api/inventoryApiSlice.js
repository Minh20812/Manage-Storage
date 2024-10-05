import apiSlice from "./apiSlice";
import { INVENTORY_URL } from "../constants";

const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (inventory) => ({
        url: INVENTORY_URL,
        method: "POST",
        body: inventory,
      }),
      invalidatesTags: ["Inventory"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: INVENTORY_URL,
      }),
      providesTags: ["Inventory"],
      keepUnusedDataFor: 5,
    }),
    deleteProduct: builder.mutation({
      query: (inventoryId) => ({
        url: `${INVENTORY_URL}/${inventoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${INVENTORY_URL}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Inventory", id }],
      keepUnusedDataFor: 5,
    }),
    updateProductById: builder.mutation({
      query: (data) => ({
        url: `${INVENTORY_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Inventory", id: _id },
      ],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} = inventoryApiSlice;
