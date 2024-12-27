"use client";

import React from "react";

import {
  Dialog,
  DialogClose,
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="bg-sky-700 text-white p-4 text-4xl rounded-xl shadow-xl border-2 border-sky-950 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            status === "Failed" ||
            status === "Initiated" ||
            status === "Successful"
          }
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
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}

export default PaymentDialog;
