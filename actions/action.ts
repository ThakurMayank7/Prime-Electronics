"use server";

import { adminDb } from "@/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

type user = {
  uid: string;
  email: string;
  name: string;
  dob: string;
  contact: string;
  gender: string;
  photoUrl: string;
};

interface DeliveryDetails {
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

export async function updateCart(
  newCart: string[],
  userId: string | null
): Promise<boolean> {
  if (!newCart || !userId) {
    console.warn("cart or userId is empty or null");
    return false;
  }
  try {
    const userRef = adminDb.collection("users").doc(userId);
    await userRef.update({
      cartItems: newCart,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateFavorites(
  newWishlist: string[],
  userId: string | null
): Promise<boolean> {
  if (!newWishlist || !userId) {
    console.warn("wishlist or userId is empty or null");
    return false;
  }
  try {
    const userRef = adminDb.collection("users").doc(userId);
    await userRef.update({
      favorites: newWishlist,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function createNewOrder({
  deliveryDetails,
  userId,
  items,
  prevOrders,
}: {
  deliveryDetails: DeliveryDetails;
  userId: string;
  items: string[];
  prevOrders: string[];
}): Promise<boolean> {
  if (!deliveryDetails || !userId || !items) {
    return false;
  }
  try {
    const orderRef = await adminDb.collection("orders").add({
      items,
      userId,
      deliveryDetails,
      status: "pending",
      createdAt: Timestamp.now(),
    });
    const orderId: string = orderRef.id;

    const newOrders: string[] = [...prevOrders, orderId];

    const userRef = adminDb.collection("users").doc(userId);
    await userRef.update({
      orders: newOrders,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
