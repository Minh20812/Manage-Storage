/** @format */

import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import handleAPI from "../apis/handleAPI";
import { DateTime } from "../utils/dateTime";
import { hanldExportExcel } from "../utils/handleExportExcel";
import DatePicker from "react-datepicker"; // Third-party date picker
import "react-datepicker/dist/react-datepicker.css";

const ModalExportData = (props) => {
  const { visible, onClose, api, name } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const [forms, setForms] = useState();
  const [checkedValues, setCheckedValues] = useState([]);
  const [timeSelected, setTimeSelected] = useState("ranger");
  const [dates, setDates] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    if (visible) {
      getFroms();
    }
  }, [visible, api]);

  const getFroms = async () => {
    const url = `/${api}/get-form`;
    setIsGetting(true);
    try {
      const res = await handleAPI(url);
      res.data && setForms(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGetting(false);
    }
  };

  const handleChangeCheckedValue = (val) => {
    const items = [...checkedValues];
    const index = items.findIndex((element) => element === val);

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(val);
    }

    setCheckedValues(items);
  };

  const handleExport = async () => {
    let url = ``;
    if (timeSelected !== "all" && dates.start && dates.end) {
      if (new Date(dates.start).getTime() > new Date(dates.end).getTime()) {
        alert("Thời gian lỗi!!!");
      } else {
        url = `/${api}/get-export-data/?start=${dates.start}&end=${dates.end}`;
      }
    } else {
      url = `/${api}/get-export-data`;
    }

    const data = checkedValues;
    if (Object.keys(data).length > 0) {
      setIsLoading(true);
      try {
        const res = await handleAPI(url, data, "post");

        res.data && (await hanldExportExcel(res.data, api));

        onClose();
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please select 1 key of values");
    }
  };

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                  Export to excel
                </Dialog.Title>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={timeSelected === "all"}
                      onChange={() =>
                        setTimeSelected(
                          timeSelected === "all" ? "ranger" : "all"
                        )
                      }
                    />
                    <span className="ml-2 text-gray-700">Get all</span>
                  </label>
                </div>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={timeSelected === "ranger"}
                      onChange={() =>
                        setTimeSelected(
                          timeSelected === "all" ? "ranger" : "all"
                        )
                      }
                    />
                    <span className="ml-2 text-gray-700">Date range</span>
                  </label>
                </div>
                {timeSelected === "ranger" && (
                  <div className="mt-2">
                    <DatePicker
                      selectsRange={true}
                      startDate={dates.start}
                      endDate={dates.end}
                      onChange={(update) => {
                        setDates({
                          start: update[0],
                          end: update[1],
                        });
                      }}
                      isClearable={true}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <div className="space-y-2">
                    {forms?.formItems?.map((item) => (
                      <label
                        key={item.key}
                        className="inline-flex items-center"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={checkedValues.includes(item.value)}
                          onChange={() => handleChangeCheckedValue(item.value)}
                        />
                        <span className="ml-2 text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className={`inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleExport}
                    disabled={isLoading}
                  >
                    {isLoading ? "Exporting..." : "Export"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalExportData;
