import { ilike, or, eq, SQL, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const searchTerm = new URL(request.url).searchParams.get("searchTerm");
  let where: SQL[] = [];

  if (searchTerm) {
    where = [
      ilike(advocates.firstName, `%${searchTerm}%`),
      ilike(advocates.lastName, `%${searchTerm}%`),
      ilike(advocates.city, `%${searchTerm}%`),
      ilike(advocates.degree, `%${searchTerm}%`),
      sql<string>`cast(${advocates.specialties} as text) ilike '%' || ${searchTerm} || '%'`,
    ];

    const number = Number(searchTerm);

    if (number) {
      // sanity check to exclude when the term is a phone number
      if (number < 100) {
        where.push(eq(advocates.yearsOfExperience, number));
      } else {
        // this "could" be a phone number
        where.push(
          sql<string>`cast(${advocates.phoneNumber} as text) like '%' || ${searchTerm} || '%'`
        );
      }
    }
  }

  const query = db
    .select()
    .from(advocates)
    .where(or(...where));

  console.log(query.toSQL());

  const data = await query;
  return Response.json({ data });
}
