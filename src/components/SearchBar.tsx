"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const clearInput = () => setValue("");

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
      <div className="relative w-[266px] h-[48px] sm:w-[420px] sm:h-[48px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9C9C]"
          size={20}
        />

        <input 
        name="search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Телефоны, яблоки, груши..."
        className="w-[266px] h-[48px] bg-[#EEEEEE] rounded-xl py-[12px] pr-[36px] pl-[34px]
                    font-[Arial] font-normal text-base leading-none text-left
                    text-black placeholder-[#9C9C9C]
                    sm:w-[420px] sm:h-[48px]"
        />

        {value && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C9C9C] hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="w-[84px] h-[48px] bg-[#EB0C0C] text-white px-4 py-[14px] rounded-xl 
                   flex items-center justify-center hover:brightness-90 cursor-pointer transition"
      >
        Искать
      </button>
    </form>
  );
}