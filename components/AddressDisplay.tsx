import React from "react";

interface AddressProps {
  fullName: string;
  phone: string;
  email?: string;
  streetAddress: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryInstructions?: string;
}
function AddressDisplay(address: AddressProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-md">
      <h3 className="text-lg font-semibold text-gray-800">
        {address.fullName}
      </h3>
      <p className="text-sm text-gray-600">{address.phone}</p>
      {address.email && (
        <p className="text-sm text-gray-600">{address.email}</p>
      )}
      <div className="mt-3 text-sm text-gray-700">
        <p>{address.streetAddress}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.city}, {address.state}, {address.postalCode}
        </p>
        <p>{address.country}</p>
      </div>
      {address.deliveryInstructions && (
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium">Delivery Instructions:</p>
          <p>{address.deliveryInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default AddressDisplay;
