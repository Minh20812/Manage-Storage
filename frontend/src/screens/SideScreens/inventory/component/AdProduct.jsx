import { Dialog } from "@headlessui/react";

import { useAddProductMutation } from "../../../../redux/api/inventoryApiSlice.js";

const AdProduct = ({ isOpen, closeModal }) => {
  const [addProduct] = useAddProductMutation();
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div
        className=" fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Add Products
          </Dialog.Title>

          <form>
            {/* Product name */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className=" border-black-200 border-2 rounded-md w-full p-2"
              />
            </div>
            {/* Product id */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Product ID
              </label>
              <input
                type="text"
                placeholder="Enter product ID"
                className=" border-black-200 border-2 rounded-md w-full p-2"
              />
            </div>
            {/* Category */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Category
              </label>
              <input
                type="text"
                placeholder="Select product category"
                className=" border-black-200 border-2 rounded-md w-full p-2"
              />
            </div>
            {/* Buying Price */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Buying Price
              </label>
              <input
                type="text"
                placeholder="Enter buying price"
                className=" border-black-200 border-2 rounded-md w-full p-2"
              />
            </div>
            {/* Quantity */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Quantity
              </label>
              <input
                type="text"
                placeholder="Enter product quantity"
                className=" border-black-200 border-2 rounded-md w-full p-2"
              />
            </div>
            {/* Unit */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Unit
              </label>
              <input
                type="text"
                placeholder="Enter product unit"
                className=" border-black-200 border-2 rounded-md w-full p-2"
              />
            </div>
            {/* Expiry Date */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="Enter expiry date"
                className=" border-black-200 border-2 rounded-md w-full p-2"
              />
            </div>
            {/* Threshold Value */}
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium mr-4 w-1/3">
                Threshold Value
              </label>
              <input
                type="text"
                placeholder="Enter threshold value"
                className=" border-black-200 border-2 rounded-md w-full p-2"
              />
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AdProduct;
