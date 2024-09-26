import { SelectAdvocates } from "@/db/schema";
import { ResultsTable } from "@/components/search-results/results-table";
import { ResultsList } from "@/components/search-results/results-list";

interface SearchResultsProps {
  advocates: SelectAdvocates[];
}

export const SearchResults = ({ advocates }: SearchResultsProps) => {
  return (
    <div className="md:pt-6">
      <ResultsTable advocates={advocates} />
      <ResultsList advocates={advocates} />
    </div>
  );
};
