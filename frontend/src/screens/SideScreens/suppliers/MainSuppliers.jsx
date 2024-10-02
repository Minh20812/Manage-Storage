import React, { useState, useMemo } from "react";
import AddSupplierModal from "./component/AddSupplierModal";
import EditSupplierModal from "./component/EditSupplierModal";
import {
  useGetAllSuppliersQuery,
  useUpdateSupplierByIdMutation,
} from "../../../redux/api/supplierApiSlice";
import Filter from "./component/Filter";

const MainSuppliers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const itemsPerPage = 8;

  const {
    data: suppliers = [],
    isLoading,
    error,
    refetch,
  } = useGetAllSuppliersQuery();
  const [updateSupplier] = useUpdateSupplierByIdMutation();

  const filteredSuppliers = useMemo(() => {
    let result = [...suppliers];
    if (currentFilter === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentFilter === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (currentFilter === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return result;
  }, [suppliers, currentFilter]);

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleFilter = (filterValue) => {
    setCurrentFilter(filterValue);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedSupplier(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateSupplier = async (updatedSupplier) => {
    try {
      console.log("Attempting to update supplier:", updatedSupplier);
      const result = await updateSupplier(updatedSupplier).unwrap();
      console.log("API response after update:", result);
      refetch(); // Refresh the suppliers list
      closeEditModal();
    } catch (err) {
      console.error("Failed to update supplier:", err);
    }
  };

  const downloadAllData = () => {
    const csvHeader =
      "Supplier Name,Product,Category,Buying Price,Contact Number,Email\n";
    const csvRows = suppliers
      .map((supplier) =>
        [
          supplier.name,
          supplier.product,
          supplier.category,
          supplier.buyingPrice,
          supplier.contactNumber,
          supplier.email,
        ].join(",")
      )
      .join("\n");

    const csvContent = csvHeader + csvRows;

    // Create a Blob for downloading
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "suppliers_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <div className="space-x-2">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Supplier
          </button>
          <AddSupplierModal isOpen={isModalOpen} closeModal={closeModal} />

          <Filter onFilter={handleFilter} />
          <button
            onClick={downloadAllData}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Supplier Name</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Buying Price</th>
              <th className="py-2 px-4 text-left">Contact Number</th>
              <th className="py-2 px-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {currentSuppliers.map((supplier, index) => (
              <tr
                key={supplier._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4">{supplier.name}</td>
                <td className="py-2 px-4">{supplier.product}</td>
                <td className="py-2 px-4">{supplier.category}</td>
                <td className="py-2 px-4">{supplier.buyingPrice}</td>
                <td className="py-2 px-4">{supplier.contactNumber}</td>
                <td className="py-2 px-4">{supplier.email}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => openEditModal(supplier)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <EditSupplierModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        supplier={selectedSupplier}
        onUpdate={handleUpdateSupplier}
      />
    </div>
  );
};

export default MainSuppliers;
