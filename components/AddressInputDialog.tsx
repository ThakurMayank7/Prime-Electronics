"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

function AddressInputDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-cyan-400 text-white rounded-lg p-4 shadow-lg border-2 border-cyan-900 hover:bg-cyan-600 text-lg">
          Add Address
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div>data here</div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddressInputDialog;
