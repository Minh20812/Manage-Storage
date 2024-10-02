import apiSlice from "./apiSlice";
import { SUPPLIERS_URL } from "../constants";

export const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSupplier: builder.mutation({
      query: (supplier) => ({
        url: SUPPLIERS_URL,
        method: "POST",
        body: supplier,
      }),
      invalidatesTags: ["Supplier"],
    }),
    getAllSuppliers: builder.query({
      query: () => ({
        url: SUPPLIERS_URL,
      }),
      providesTags: ["Supplier"],
      keepUnusedDataFor: 5,
    }),
    deleteSupplierById: builder.mutation({
      query: (supplierId) => ({
        url: `${SUPPLIERS_URL}/${supplierId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Supplier"],
    }),
    getSupplierById: builder.query({
      query: (id) => ({
        url: `${SUPPLIERS_URL}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Supplier", id }],
      keepUnusedDataFor: 5,
    }),
    updateSupplierById: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIERS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Supplier", id: _id },
      ],
    }),
  }),
});

export const {
  useAddSupplierMutation,
  useGetAllSuppliersQuery,
  useDeleteSupplierByIdMutation,
  useGetSupplierByIdQuery,
  useUpdateSupplierByIdMutation,
} = supplierApiSlice;
