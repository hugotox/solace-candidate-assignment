import { SelectAdvocates } from "@/db/schema";
import { Phone } from "lucide-react";

interface ResultsListProps {
  advocates: SelectAdvocates[];
}

export const ResultsList = ({ advocates }: ResultsListProps) => {
  return (
    <ul className="block md:hidden p-4">
      {advocates.map((advocate) => {
        return (
          <li key={advocate.id} className="border mb-4 rounded-sm">
            <div className="p-4">
              <div className="font-bold">
                {advocate.firstName} {advocate.lastName}
              </div>
              <div className="text-sm text-gray-600">
                {advocate.degree} • {advocate.city}
              </div>
            </div>
            <div className="bg-green-800/10 p-4">
              <div className="mb-2 line-clamp-3">
                {advocate.specialties.map((specialty, idx) => (
                  <div key={`${specialty}-${idx}`}>{specialty}</div>
                ))}
              </div>
              <div>
                <a
                  href={`tel:${advocate.phoneNumber}`}
                  className="flex gap-1 items-center"
                >
                  <Phone size={14} className="inline-block" />
                  {advocate.phoneNumber}
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
