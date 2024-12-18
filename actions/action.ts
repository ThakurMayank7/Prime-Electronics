"use server";

import { adminDb } from "@/firebase/admin";

type user = {
  uid: string;
  email: string;
  name: string;
  dob: string;
  contact: string;
  gender: string;
};

export async function createNewUser(newUser: user): Promise<boolean> {
  if (!newUser.uid) {
    console.error("Error: User must have a UID.");
    return false;
  }
  try {
    await adminDb.collection("users").doc(newUser.uid).set(newUser);
    return true;
  } catch (error) {
    console.error("Could'nt create a new user", error);
    return false;
  }
}

//check if a user is currently existing
export async function checkExistingUser(uid: string | null): Promise<boolean> {
  if (!uid) {
    console.warn("UID is null or empty."); // Handle invalid input early
    return false;
  }

  // return false;
  try {
    const snapshot = await adminDb.collection("users").doc(uid).get();

    // Check if any document was found
    if (snapshot.exists) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return false; // Handle error and return false
  }
}
