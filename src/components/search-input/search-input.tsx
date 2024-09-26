import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, debounce } from "@/lib/utils";
import { X } from "lucide-react";

interface SearchInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  searchTerm: string;
}

export const SearchInput = ({
  searchTerm,
  onChange,
  onClick,
}: SearchInputProps) => {
  return (
    <div className="bg-green-800/30 p-4 md:p-6">
      <p className="text-2xl text-gray-700 text-center mb-4 hidden md:block">
        Search
      </p>
      <p className="text-center mb-2">
        Searching for: <span className="italic">{searchTerm}</span>
      </p>
      <div className="relative max-w-lg mx-auto">
        <Input onChange={onChange} value={searchTerm} />
        <Button
          type="button"
          onClick={onClick}
          className={cn(
            "p-0 w-8 h-8 bg-green-800/30 absolute right-1 top-1 rounded-full flex items-center justify-center",
            searchTerm ? "flex" : "hidden"
          )}
          aria-label="Reset Search"
        >
          <X size={24} />
        </Button>
      </div>
    </div>
  );
};
