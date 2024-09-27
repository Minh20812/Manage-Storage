import { Dialog, Select } from "@headlessui/react";
import { useState } from "react";
import { useAddSupplierMutation } from "../../../../redux/api/supplierApiSlice.js";

const AddSupplierModal = ({ isOpen, closeModal }) => {
  const [addSupplier] = useAddSupplierMutation();
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    product: "",
    category: "",
    buyingPrice: "",
    contactNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSupplier(supplier).unwrap();
      console.log("New Supplier Added Successfully");
      console.log(supplier);
      closeModal();
    } catch (error) {
      console.error("Failed to add supplier: ", error);
      console.log(supplier);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Add Supplier
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            {/* Supplier Name */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Supplier Name
              </label>
              <input
                type="text"
                value={supplier.name}
                onChange={(e) =>
                  setSupplier({ ...supplier, name: e.target.value })
                }
                className="mt-2 p-2 border border-gray-300 rounded w-2/3"
                required
              />
            </div>

            {/* Product */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Product
              </label>
              <input
                type="text"
                value={supplier.product}
                onChange={(e) =>
                  setSupplier({ ...supplier, product: e.target.value })
                }
                className="mt-2 p-2 border border-gray-300 rounded w-2/3"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Category
              </label>
              <input
                type="text"
                value={supplier.category}
                onChange={(e) =>
                  setSupplier({ ...supplier, category: e.target.value })
                }
                className="mt-2 p-2 border border-gray-300 rounded w-2/3"
                required
              />
            </div>

            {/* Buying Price */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Buying Price
              </label>
              <input
                type="number"
                value={supplier.buyingPrice}
                // In AddSupplierModal.jsx
                onChange={(e) =>
                  setSupplier({
                    ...supplier,
                    buyingPrice: parseFloat(e.target.value),
                  })
                }
                className="mt-2 p-2 border border-gray-300 rounded w-2/3"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Contact Number
              </label>
              <input
                type="text"
                value={supplier.contactNumber}
                onChange={(e) =>
                  setSupplier({ ...supplier, contactNumber: e.target.value })
                }
                className="mt-2 p-2 border border-gray-300 rounded w-2/3"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Email
              </label>
              <input
                type="email"
                value={supplier.email}
                onChange={(e) =>
                  setSupplier({ ...supplier, email: e.target.value })
                }
                className="mt-2 p-2 border border-gray-300 rounded w-2/3"
                required
              />
            </div>

            {/* Supplier Type */}
            {/* <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Supplier Type
              </label>
              <Select name="status" aria-label="type">
                <option value="active">Taking Return</option>
                <option value="paused">Not Taking Return</option>
              </Select>
            </div> */}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
              >
                Add Supplier
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddSupplierModal;
