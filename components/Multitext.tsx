"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />

      <div className="mt-4 flex flex-col gap-1">
        {value.map((item, index) => (
          <div key={index} className="flex items-center gap-6 border-b p-1">
            <p>{item}</p>
            <button
              className="hover:bg-red-1 ml-1 rounded-full outline-none"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiText;
