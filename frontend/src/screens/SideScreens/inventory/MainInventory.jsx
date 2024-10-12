import { useState } from "react";
import AdProduct from "./component/AdProduct";

const MainInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={openModal}
          >
            Add Products
          </button>

          <AdProduct isOpen={isModalOpen} closeModal={closeModal} />

          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Filter
          </button>

          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Download All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Products</th>
              <th className="py-2 px-4 text-left">Buying Price</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Threshold Value</th>
              <th className="py-2 px-4 text-left">Expiry Date</th>
              <th className="py-2 px-4 text-left">Availability</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
          Previous
        </button>
        <p>Page 1 of 10</p>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default MainInventory;
