"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface PaymentDialogType {
  status: "NotInitiated" | "Initiated" | "Successful" | "Failed";
  changeStatus: (
    s: "NotInitiated" | "Initiated" | "Successful" | "Failed"
  ) => void;
}

function PaymentDialog({ status, changeStatus }: PaymentDialogType) {
  const [futureStatus, setFutureStatus] = useState<"Successful" | "Failed">(
    "Successful"
  );

  const [open, setOpen] = useState<boolean>(false);

  const completePayment = () => {
    changeStatus(futureStatus);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <button
          className="bg-sky-700 text-white p-4 text-4xl rounded-xl shadow-xl border-2 border-sky-950 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === "Initiated" || status === "Successful"}
          onClick={() => setOpen(true)}
        >
          {status === "Failed"
            ? "Retry Payment"
            : status === "Initiated"
            ? "Payment has been Initiated"
            : "Proceed To Payment"}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Payment</DialogTitle>
          <DialogDescription>
            I have not created the payment system yet. But, you can try the
            different payment status below :
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col my-4 gap-6">
          <button
            className={`hover:bg-red-700 ${
              futureStatus === "Failed"
                ? "bg-red-700 border-2 border-red-900"
                : "bg-red-600"
            } rounded-lg text-lg text-white p-2`}
            onClick={() => setFutureStatus("Failed")}
          >
            Failed
          </button>
          <button
            className={`hover:bg-green-900 ${
              futureStatus === "Successful"
                ? "bg-green-700 border-2 border-green-900"
                : "bg-green-400"
            } rounded-lg text-lg text-white p-2`}
            onClick={() => setFutureStatus("Successful")}
          >
            Successful
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700"
            onClick={() => completePayment()}
          >
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentDialog;
