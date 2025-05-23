import React from "react";
import { formData } from "../Utils/data";

const AddCustomer = () => {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="w-3/4 p-7 bg-white rounded-lg">
        <h2 className="mb-5">Add New Customer</h2>
        <form>
          <div className="grid grid-cols-3 gap-4">
            {formData.map((form) => {
              return (
                <div className="col flex flex-col gap-2">
                  <label htmlFor={form.id} className="text-sm font-semibold">
                    {form.label}
                  </label>
                  <input
                    type={form.inputType}
                    placeholder={form.placeholder}
                    id={form.id}
                    className="p-3 border border-gray-400 rounded-md text-sm"
                  />
                </div>
              );
            })}

            <div className="flex flex-col gap-2">
              <label htmlFor="schema" className="text-sm font-semibold">
                Schema
              </label>
              <select
                id="schema"
                className="p-3 pr-4 appearance-none border border-gray-400 rounded-md text-sm"
              >
                <option value="SM_GOLD">SM_GOLD</option>
                <option value="SM_GOLD">SM_BIKE</option>
              </select>
            </div>
          </div>

          <button className=" w-full mt-5 p-3 bg-blue-500 hover:bg-blue-600 font-bold text-white uppercase cursor-pointer rounded-md text-sm">
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
