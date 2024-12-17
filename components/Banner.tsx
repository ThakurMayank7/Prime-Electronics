"use client";

import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Spinner from "./BlocksSpinner";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface BannerData {
  id?: string;
  featuredItemDisplayImage?: string;
  bannerTitle: string;
  bannerTitleColor: string;
  bannerDescription: string;
  bannerDescriptionColor: string;
  bannerHighlightedText: string;
  bannerHighlightedTextColor: string;
  bannerSecondaryHighlightedText: string;
  bannerSecondaryHighlightedTextColor: string;
  leftPanelColor: string;
  rightPanelColor: string;
  isNavigationButton: string; // "true" or "false"

  presence: {
    buttonPresent: boolean;
    isItemFeatured: boolean;
    isHighlightedPresent: boolean;
    isSecondaryHighlightedPresent: boolean;
    isDescriptionPresent: boolean;
    isTitlePresent: boolean;
  };

  itemFeaturedId: string;
}

function Banner() {
  const [loading, setLoading] = useState<boolean>(true);

  const [data, setData] = useState<BannerData[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "banners"));
        const fetchedData: BannerData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID if needed
          ...doc.data(),
        })) as BannerData[]; // Cast the data to the BannerData type

        const ids: string[] = [];

        for (let i = 0; i < fetchedData.length; i++) {
          ids.push(fetchedData[i].itemFeaturedId);
        }

        const q = query(
          collection(db, "items"), // Replace with your collection name
          where(documentId(), "in", ids) // Query by document IDs
        );

        const querySnap = await getDocs(q);

        // Create a map for the displayImageRef based on the document ID
        const results: { [key: string]: string } = {};
        querySnap.forEach((doc) => {
          const displayImageRef = doc.get("displayImageRef");
          results[doc.id] = displayImageRef; // Store displayImageRef with doc ID as key
        });

        // Now update the fetchedData with the corresponding displayImageRef
        const updatedData = fetchedData.map((banner) => {
          return {
            ...banner,
            featuredItemDisplayImage: results[banner.itemFeaturedId] || "", // Assign displayImageRef
          };
        });

        setData(updatedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(data.length===0)
  {
    return null;
  }

  return (
    <div className="border-2 border-black rounded p-1">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Carousel banners={data} />
      )}
    </div>
  );
}

export default Banner;
