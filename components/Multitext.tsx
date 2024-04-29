"use client";

import { SetStateAction, useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface Props {
  placeholder: string;
  value: string[];
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText = ({
  placeholder,
  value,
  disabled,
  onChange,
  onRemove,
}: Props) => {
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
        disabled={disabled}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setInputValue(e.target.value)
        }
        onKeyDown={(e: { key: string; preventDefault: () => void }) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />

      <div className="mt-4 flex flex-col gap-1">
        {value.map((item, index) => (
          <Badge key={index}>
            {item}
            <button
              className="ml-1 rounded-full outline-none"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
