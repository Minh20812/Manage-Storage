import React from "react";
import { Menu } from "@headlessui/react";

const Filter = ({ onFilter }) => {
  const filters = [
    { name: "A-Z", value: "az" },
    { name: "Newest", value: "newest" },
    { name: "Oldest", value: "oldest" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        Filters
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {filters.map((filter) => (
            <Menu.Item key={filter.value}>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } group flex w-full items-center px-4 py-2 text-sm`}
                  onClick={() => onFilter(filter.value)}
                >
                  {filter.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default Filter;
