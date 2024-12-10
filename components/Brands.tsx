import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";

type brand = {
  id: string;
  name: string;
};

function Brands() {
  const [featuredBrands, setFeaturedBrands] = useState<brand[]>([]);

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

          try {
            const ref = collection(db, "brands");

            const brandsQuery = query(
              ref,
              where("__name__", "in", brandIdsArray)
            );

            const querySnapshot = await getDocs(brandsQuery);

            const brands: brand[] = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
            }));

            setFeaturedBrands(brands);
          } catch (err) {
            console.error("some error occurred", err);
          }

          // setFeaturedBrands(brandIdsArray);
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

  return (
    <div className="border-2 border-black rounded p-1 flex flex-row">
      {featuredBrands.map((b) => (
        <Card key={b.id}>
          <CardHeader>
            <CardTitle>{b.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image src="https://picsum.photos/200" alt={b.name} width={160} height={160} layout="intrinsic"/>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Brands;
