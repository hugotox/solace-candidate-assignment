"use client";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { SearchInput } from "@/components/search-input/search-input";
import { SearchResults } from "@/components/search-results/search-results";
import { SelectAdvocates } from "@/db/schema";
import { fetchAdvocates } from "@/lib/api-utils";
// import { debounce } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<SelectAdvocates[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      console.log("fetching advocates...", searchTerm);
      const jsonResponse = await fetchAdvocates(searchTerm);
      setAdvocates(jsonResponse);
    }
    fetchData();
  }, [searchTerm]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTermTmp = e.target.value;
    setSearchTerm(searchTermTmp);
  };

  const onClick = () => {
    setSearchTerm("");
  };

  return (
    <>
      <main className="flex flex-col mb-10">
        <Header />
        <SearchInput
          onChange={onChange}
          onClick={onClick}
          searchTerm={searchTerm}
        />
        <SearchResults advocates={advocates} />
      </main>
      <Footer />
    </>
  );
}
