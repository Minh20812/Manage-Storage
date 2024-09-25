// /** @format */

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
import React from "react";

const MainSuppliers = () => {
  return <div>MainSuppliers</div>;
};

export default MainSuppliers;
