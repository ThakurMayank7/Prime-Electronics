'use server';

import { adminDb } from "@/firebase/admin";

export async function createNewUser(email:string)
{

}



//check if a user is currently existing
export async function checkExistingUser(email: string|null): Promise<boolean> {

    return false;
    // try {
    //   const snapshot = await adminDb.collection('admins').where('email', '==', email).get(); // Query and get the data
  
    //   // Check if any document was found
    //   if (snapshot.empty) {
    //     return false; // No admin found with the given email
    //   } else {
    //     return true; // Admin exists
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   return false; // Handle error and return false
    // }
  }