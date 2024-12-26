"use client";

import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Category {
  display: string;
  id: string;
}

function SearchByCategory() {
  const { user } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!user)
      try {
        const fetchCategories = async () => {
          const categoriesSnapshot = await getDoc(doc(db, "data", "Category"));
          if (categoriesSnapshot.exists()) {
            const data = categoriesSnapshot.data();
            const temp: Category[] = Object.entries(data).map(
              ([id, value]) => ({
                id,
                display: value as string,
              })
            );
            setCategories(temp);
          }
        };
        fetchCategories();
      } catch (error) {
        console.error(error);
      }
  }, [user]);

  return (
    <div className="border-2 border-black rounded p-1">
      <h1 className="text-4xl font-serif my-2">Search By Category</h1>
      <div className="flex flex-row gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded bg-slate-700 hover:bg-slate-800 hover:cursor-pointer text-lg text-white p-2"
          >
            {category.display}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchByCategory;
