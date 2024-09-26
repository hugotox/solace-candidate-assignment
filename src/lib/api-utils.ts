import { SelectAdvocates } from "@/db/schema";

export const fetchAdvocates = async (searchTerm: string) => {
  const response = await fetch(`/api/advocates?searchTerm=${searchTerm}`);
  const jsonResponse: { data: SelectAdvocates[] } = await response.json();
  return jsonResponse.data;
};
