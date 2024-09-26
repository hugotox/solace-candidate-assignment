"use client";

import { SelectAdvocates } from "@/db/schema";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<SelectAdvocates[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<SelectAdvocates[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchAdvocates() {
      console.log("fetching advocates...");
      const response = await fetch("/api/advocates");
      const jsonResponse: { data: SelectAdvocates[] } = await response.json();
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
    }
    fetchAdvocates();
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        String(advocate.yearsOfExperience).includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((specialty, idx) => (
                    <div key={`${specialty}-${idx}`}>{specialty}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
