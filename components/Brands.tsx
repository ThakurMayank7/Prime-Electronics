import React, { useEffect, useState } from "react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function Brands() {
  const [featuredBrands, setFeaturedBrands] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setLoading(true);

      const getResult = async () => {
        const brandsRef = doc(db, "featured", "brands");
        const brandsSnap = await getDoc(brandsRef);

        if (brandsSnap.exists()) {
          const data = brandsSnap.data();

          const brandIdsArray = [];


          //  field id is string
          for (let i = 0; i < 8; i++) {
            if (data[i.toString()]) {
              brandIdsArray.push(data[i.toString()]);
            }
          }



          // const brands = [];




          setFeaturedBrands(brandIdsArray);
        } else {
          console.log("nothing in featured brands");
        }
      };
      getResult();
    } catch (error) {
      console.error("some error occurred:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <div className="border-2 border-black rounded p-1">
    {featuredBrands.map((brand) =><p key={brand}>{brand}</p>)}
  </div>;
}

export default Brands;
