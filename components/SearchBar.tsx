"use client";

import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

type suggestion = {
  display: string;
  value: string;
  type: string;
};

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestionData, setSuggestionData] = useState<string[]>([]);

  // const [mockSuggestionData, setMockSuggestionData] = useState<suggestion[]>(
  // []
  // );

  const router = useRouter();

  useEffect(() => {
    try {
      const fetchSuggestions = async () => {
        const itemsSnap = await getDoc(doc(db, "data", "items"));

        const fetchedSuggestions: suggestion[] = [];

        if (itemsSnap.exists()) {
          console.log(itemsSnap.data());

          for (const index in itemsSnap.data()) {
            console.log(index + "=>" + itemsSnap.data()[index]);

            const temporarySuggestion: suggestion = {
              display: itemsSnap.data()[index],
              value: index,
              type: "item",
            };
            console.log(temporarySuggestion);
            fetchedSuggestions.push(temporarySuggestion);
          }
        }
        const brandsSnap = await getDoc(doc(db, "data", "brands"));

        if (brandsSnap.exists()) {
          // console.log(brandsSnap.data());

          for (const index in brandsSnap.data()) {
            console.log(index + "=>" + brandsSnap.data()[index]);

            const temporarySuggestion: suggestion = {
              display: brandsSnap.data()[index],
              value: index,
              type: "brand",
            };
            console.log(temporarySuggestion);
            fetchedSuggestions.push(temporarySuggestion);
          }
        }
        const categoriesSnap = await getDoc(doc(db, "data", "Category"));

        if (categoriesSnap.exists()) {
          for (const index in categoriesSnap.data()) {
            console.log(index + "=>" + categoriesSnap.data()[index]);

            const temporarySuggestion: suggestion = {
              display: categoriesSnap.data()[index],
              value: index,
              type: "category",
            };
            console.log(temporarySuggestion);
            fetchedSuggestions.push(temporarySuggestion);
          }
        }

        console.log(fetchedSuggestions);

        const suggestedStrings = fetchedSuggestions.map((s:suggestion) => s.display);

        setSuggestionData(suggestedStrings);
        // setSuggestionData(["Apple", "Banana", "Cherry", "Date", "Elderberry"]);
      };
      fetchSuggestions();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = (query: string): string[] => {
      // Replace this with your API call

      return suggestionData.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
    };
    const timer = setTimeout(() => {
      if (query.trim()) {
        setSuggestions(fetchSuggestions(query));
        setHighlightedIndex(-1);
      } else {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, suggestionData]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      console.log("highlightedIndex", highlightedIndex);
      setQuery(suggestions[highlightedIndex]);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (query !== null && e.key === "Enter") {
      if (inputRef.current) {
        inputRef.current.blur();
      }
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (query !== null) router.push(`/search/${query}?name=John%20Doe`);
    // console.log("query", query);
  };

  return (
    <div className="text-teal-800 relative w-[300px] bg-teal-100 flex-row items-center justify-between flex rounded p-0.5">
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded bg-transparent w-full"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded z-10 max-h-[150px] overflow-y-auto list-none m-0 p-0 mt-48">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`p-2 cursor-pointer ${
                index === highlightedIndex ? "bg-gray-200" : ""
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <Search className="mx-2" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
