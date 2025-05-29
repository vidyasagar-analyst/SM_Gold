import React, { useState } from "react";
import { formData } from "../Utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCustomer = () => {
  const [formDetails, setFormDetails] = useState({});

  const handleOnChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:8000/api/v1/customers/add-customer",
        formDetails
      );

      toast.success(result?.data?.message);
      navigate("/customers");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong! Try Again Later!"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-3/4 p-7 bg-white border border-gray-400/25 rounded-lg">
        <h2 className="mb-5">Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            {formData.map((form, index) => {
              return (
                <div className="col flex flex-col gap-2" key={index}>
                  <label htmlFor={form.id} className="text-sm font-semibold">
                    {form.label}
                  </label>
                  <input
                    type={form.inputType}
                    placeholder={form.placeholder}
                    id={form.id}
                    className="p-3 border border-gray-400/25 bg-gray-200/50 rounded-md text-sm"
                    name={form.name}
                    maxLength={form.maxLength}
                    onChange={handleOnChange}
                    // required
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
                name="schema"
                className="p-3 pr-4 appearance-none border border-gray-400/25 bg-gray-200/50 rounded-md text-sm"
                onChange={handleOnChange}
              >
                <option value="SM_GOLD">SM_GOLD</option>
                <option value="SM_GOLD">SM_BIKE</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className=" w-full mt-5 p-3 bg-blue-500 hover:bg-blue-600 font-bold text-white uppercase cursor-pointer rounded-md text-sm"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
