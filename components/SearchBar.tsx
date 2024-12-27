"use client";

import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

interface Suggestion {
  display: string;
  value: string;
  type: string;
}

interface Query {
  value: string;
  type: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestionData, setSuggestionData] = useState<Suggestion[]>([]);

  const [sendQuery, setSendQuery] = useState<Query>({ value: "", type: "" });

  const router = useRouter();

  useEffect(() => {
    try {
      const fetchSuggestions = async () => {
        const itemsSnap = await getDoc(doc(db, "data", "items"));

        const fetchedSuggestions: Suggestion[] = [];

        if (itemsSnap.exists()) {
          for (const index in itemsSnap.data()) {
            const temporarySuggestion: Suggestion = {
              display: itemsSnap.data()[index],
              value: index,
              type: "item",
            };
            fetchedSuggestions.push(temporarySuggestion);
          }
        }
        const brandsSnap = await getDoc(doc(db, "data", "brands"));

        if (brandsSnap.exists()) {
          for (const index in brandsSnap.data()) {
            const temporarySuggestion: Suggestion = {
              display: brandsSnap.data()[index],
              value: index,
              type: "brand",
            };
            fetchedSuggestions.push(temporarySuggestion);
          }
        }
        const categoriesSnap = await getDoc(doc(db, "data", "Category"));

        if (categoriesSnap.exists()) {
          for (const index in categoriesSnap.data()) {
            const temporarySuggestion: Suggestion = {
              display: categoriesSnap.data()[index],
              value: index,
              type: "category",
            };
            fetchedSuggestions.push(temporarySuggestion);
          }
        }

        setSuggestionData(fetchedSuggestions);
      };
      fetchSuggestions();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = (query: string): Suggestion[] => {
      const suggest: Suggestion[] = [];
      suggestionData.forEach((s: Suggestion) => {
        if (s.display.toLowerCase().includes(query.toLowerCase())) {
          suggest.push(s);
        }
      });
      return suggest;
    };
    const timer = setTimeout(() => {
      if (query.trim()) {
        setSuggestions(fetchSuggestions(query));
        setHighlightedIndex(-1);
      } else {
        setSuggestions([]);
        setHighlightedIndex(-1);
        setSendQuery({ value: "", type: "" });
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
      setQuery(suggestions.at(highlightedIndex)?.display || "");
      setShowSuggestions(false);
      setSendQuery({
        value: suggestions.at(highlightedIndex)?.value || "",
        type: suggestions.at(highlightedIndex)?.type || "",
      });
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
    setSendQuery({
      value: suggestions.at(highlightedIndex)?.value || "",
      type: suggestions.at(highlightedIndex)?.type || "",
    });
  };

  const handleSearch = () => {
    let url = `/search/${query}`;

    let checking: boolean = false;
    for (const s of suggestions) {
      if (s.display === query) {
        checking = true;
        break;
      }
    }

    if (sendQuery.type !== "" && sendQuery.value !== "" && checking) {
      router.push(
        `${url}?type=${sendQuery.type}&value=${sendQuery.value}&category=${
          suggestions.filter((s) => s.value === sendQuery.value).at(0)?.display
        }`
      );
    } else if (query !== "") {
      const suggestItems: string[] = [];
      const suggestBrands: string[] = [];
      const suggestCategories: string[] = [];
      suggestionData.forEach((s: Suggestion) => {
        if (s.display.toLowerCase().includes(query.toLowerCase())) {
          switch (s.type) {
            case "item":
              suggestItems.push(s.value);
              break;
            case "brand":
              suggestBrands.push(s.value);
              break;
            case "category":
              suggestCategories.push(s.value);
              break;
          }
        }
      });

      url += `?items=${suggestItems.join(",")}`;

      url += `&brands=${suggestBrands.join(",")}`;

      url += `&categories=${suggestCategories.join(",")}`;

      router.push(url);
    }
  };

  return (
    <div className="text-teal-800 relative w-[300px] bg-teal-50 flex-row items-center justify-between flex rounded p-0.5">
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
              onClick={() => handleSuggestionClick(suggestion.display)}
              className={`p-2 cursor-pointer ${
                index === highlightedIndex ? "bg-gray-200" : ""
              }`}
            >
              {suggestion.display}
            </li>
          ))}
        </ul>
      )}
      <Search className="mx-2" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
