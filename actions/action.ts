'use server';

import { adminDb } from "@/firebase/admin";

export async function createNewUser(email:string)
{

}



//check if a user is currently existing
export async function checkExistingUser(uid: string|null): Promise<boolean> {

  if (!uid) {
    console.warn("UID is null or empty."); // Handle invalid input early
    return false;
  }
  
    // return false;
    try {
      const snapshot = await adminDb.collection('users').doc(uid).get();
  
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