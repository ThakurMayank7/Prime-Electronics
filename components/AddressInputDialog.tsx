"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface DialogProps {
  update: (data: data) => void;
}

interface data {
  fullName: "";
  phone: "";
  email: "";
  streetAddress: "";
  addressLine2: "";
  city: "";
  state: "";
  postalCode: "";
  country: "";
  deliveryInstructions: "";
}

function AddressInputDialog({ update }: DialogProps) {
  const [formData, setFormData] = useState<data>({
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    deliveryInstructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your form submission logic here

    update(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-cyan-400 text-white rounded-lg p-4 shadow-lg border-2 border-cyan-900 hover:bg-cyan-600 text-lg">
          {formData ? "Edit " : "Add "}
          Delivery Details
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <h3 className="text-xl font-semibold text-gray-800">Address Form</h3>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4 max-h-[75vh] overflow-y-auto"
        >
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium text-gray-600"
            >
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium text-gray-600"
            >
              Apartment, Suite, etc. (Optional)
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-600"
              >
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-600"
            >
              Postal/ZIP Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-600"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="deliveryInstructions"
              className="block text-sm font-medium text-gray-600"
            >
              Delivery Instructions (Optional)
            </label>
            <textarea
              id="deliveryInstructions"
              name="deliveryInstructions"
              value={formData.deliveryInstructions}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddressInputDialog;
