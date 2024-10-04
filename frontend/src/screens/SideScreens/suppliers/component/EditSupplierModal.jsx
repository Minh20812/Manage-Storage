import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDeleteSupplierByIdMutation } from "../../../../redux/api/supplierApiSlice";
import { toast } from "react-toastify";

const EditSupplierModal = ({
  isOpen,
  closeModal,
  supplier,
  onUpdate,
  refetch,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    product: "",
    category: "",
    buyingPrice: "",
    contactNumber: "",
    email: "",
  });

  const [deleteSupplierById] = useDeleteSupplierByIdMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplierById(id);
        if (refetch) refetch(); // Ensure refetch is called if available
        closeModal(); // Close the modal after successful deletion
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || "",
        product: supplier.product || "",
        category: supplier.category || "",
        buyingPrice: supplier.buyingPrice || "",
        contactNumber: supplier.contactNumber || "",
        email: supplier.email || "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "buyingPrice" ? parseFloat(value) || "" : value; // Handle NaN case
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate({
        ...supplier, // Ensure supplier is not mutated directly
        ...formData,
      });
      toast.success("Supplier updated successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to update supplier.");
    }
  };

  const handleModalClose = () => {
    setFormData({
      name: "",
      product: "",
      category: "",
      buyingPrice: "",
      contactNumber: "",
      email: "",
    }); // Reset form on close
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModalClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Supplier
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-2">
                  {/* Input fields */}
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="product"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product
                    </label>
                    <input
                      type="text"
                      name="product"
                      id="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="buyingPrice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Buying Price
                    </label>
                    <input
                      type="number"
                      name="buyingPrice"
                      id="buyingPrice"
                      value={formData.buyingPrice}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="contactNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-pink-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                      onClick={() => deleteHandler(supplier._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditSupplierModal;
