import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import AddSupplierModal from "./component/AddSupplierModal";

const MainSuppliers = () => {
  const suppliers = [
    {
      name: "Richard Martin",
      product: "Kit Kat",
      category: "Food",
      buyingprice: "100$",
      contactNumber: "7687764556",
      email: "richard@gmail.com",
      type: "Taking Return",
      onTheWay: 13,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          {/* Add Supplier Modal */}
          <AddSupplierModal isOpen={isModalOpen} closeModal={closeModal} />
          <Menu>
            <MenuButton className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Filters
            </MenuButton>
            <MenuItems anchor="bottom">
              <MenuItem>
                <a className="block data-[focus]:bg-blue-100" href="/settings">
                  Newest
                </a>
              </MenuItem>
              <MenuItem>
                <a className="block data-[focus]:bg-blue-100" href="/support">
                  Oldest
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
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
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">On the way</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4">{supplier.name}</td>
                <td className="py-2 px-4">{supplier.product}</td>
                <td className="py-2 px-4">{supplier.category}</td>
                <td className="py-2 px-4">{supplier.buyingprice}</td>
                <td className="py-2 px-4">{supplier.contactNumber}</td>
                <td className="py-2 px-4">{supplier.email}</td>
                <td className="py-2 px-4">{supplier.type}</td>
                <td className="py-2 px-4">{supplier.onTheWay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Previous
        </button>
        <p>Page 1 of 10</p>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default MainSuppliers;

// import { Edit2, Sort, UserRemove } from "iconsax-react";
// import { useEffect, useState } from "react";
// import handleAPI from "../apis/handleAPI";
// import { Button } from "@headlessui/react";
// import { ToogleSupplier } from "../../../modals/ToogleSupplier";

// import TableComponent from "../../../components/TableComponent";
// import { useNavigate, useRoutes, useSearchParams } from "react-router-dom";

// const { Title, Text } = Typography;
// const { confirm } = Modal;

// const Suppliers = () => {
//   const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false);
//   const [suppliers, setSuppliers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [supplierSelected, setSupplierSelected] = useState();
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [total, setTotal] = useState(10);
//   const [forms, setForms] = useState();

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     getSuppliers();
//   }, [page, pageSize]);

//   const getData = async () => {
//     setIsLoading(true);
//     try {
//       await getFroms();
//     } catch (error) {
//       message.error(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getFroms = async () => {
//     const api = `/supplier/get-form`;
//     const res = await handleAPI(api);

//     res.data && setForms(res.data);
//   };

//   const getSuppliers = async () => {
//     const api = `/supplier?page=${page}&pageSize=${pageSize}`;
//     setIsLoading(true);
//     try {
//       const res = await handleAPI(api);
//       res.data && setSuppliers(res.data.items);

//       const items = [];

//       res.data.items.forEach((item, index) =>
//         items.push({
//           index: (page - 1) * pageSize + (index + 1),
//           ...item,
//         })
//       );

//       setSuppliers(items);
//       setTotal(res.data.total);
//     } catch (error) {
//       message.error(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeSuppiler = async (id) => {
//     try {
//       await handleAPI(`/supplier/remove?id=${id}`, undefined, "delete");

//       await getSuppliers();
//       message.error("Remove supplier successfully!!!");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return forms ? (
//     <div>
//       <TableComponent
//         api="supplier"
//         onPageChange={(val) => {
//           setPage(val.page);
//           setPageSize(val.pageSize);
//         }}
//         onAddNew={() => {
//           setIsVisibleModalAddNew(true);
//         }}
//         loading={isLoading}
//         forms={forms}
//         records={suppliers}
//         total={total}
//         extraColumn={(item) => (
//           <div>
//             <Button
//               type="text"
//               onClick={() => {
//                 setSupplierSelected(item);
//                 setIsVisibleModalAddNew(true);
//               }}
//               icon={<Edit2 size={18} className="text-info" />}
//             />

//             <Button
//               onClick={() =>
//                 confirm({
//                   title: "Comfirm",
//                   content: "Are you sure you want to remove this supplier?",
//                   onOk: () => removeSuppiler(item._id),
//                 })
//               }
//               type="text"
//               icon={<UserRemove size={18} className="text-danger" />}
//             />
//           </div>
//         )}
//       />

//       <ToogleSupplier
//         visible={isVisibleModalAddNew}
//         onClose={() => {
//           supplierSelected && getSuppliers();
//           setSupplierSelected(undefined);
//           setIsVisibleModalAddNew(false);
//         }}
//         onAddNew={(val) => setSuppliers([...suppliers, val])}
//         supplier={supplierSelected}
//       />
//     </div>
//   ) : (
//     <Empty />
//   );
// };

// export default Suppliers;
