import React, { useState, useEffect } from "react";

interface SearchBarProps {
  fetchSuggestions: (query: string) => Promise<string[]>;
}

const SearchBar: React.FC<SearchBarProps> = ({ fetchSuggestions }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // For keyboard navigation

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        fetchSuggestions(query).then((data) => {
          setSuggestions(data);
          setHighlightedIndex(-1); // Reset highlight on new fetch
        });
      } else {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      // Move highlight down
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      // Move highlight up
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      // Select highlighted suggestion
      setQuery(suggestions[highlightedIndex]);
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      // Close suggestions
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="text-black relative w-[300px]">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded z-10 max-h-[150px] overflow-y-auto list-none m-0 p-0">
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
    </div>
  );
};

export default SearchBar;
