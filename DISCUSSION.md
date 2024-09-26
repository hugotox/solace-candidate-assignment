### Assessment of the problem

The first step is to get familiar with the codebase, identifying the data flow and overall behavior.

Given the instructions for a database setup, it seemed to be a no-brainer to use it.

The first and most noticeable bug was right there in the developer console, there were missing `key` props and invalid HTML markup.

Then, the most glaring issue was writing all the UI code in the main page file, and not taking advantage of react's way of organizing the app with components.

Finally, the default setup was maintaining 2 lists of advocates: one containing the complete list and a second one containing the filtered list. This can work for small amounts of data, and can get problematic for big datasets.

### Plan of action

* First step is seeding the database using the provided instructions, and adding data types from the schema
* Fix the bugs by adding the missing key props and fixing the html markup
* Move the search functionality to the server
* Adding styles

### Implementation details

#### Database

Seeding the database was done following the provided instructions.

Data types we added using Drizzle's `$inferSelect`, which generates the interfaces based on the table definition. [ref](https://orm.drizzle.team/docs/goodies#type-api)

#### React bugs

* In page.tsx, `key` prop was added to both mapped elements: the advocate and the advocate's specialties.
* Added missing `<tr>` to the table head

#### API

In the API file for advocate search, a `searchTerm` query param was added to allow making a filter on the database.

Filtering was done using Drizzle ORM, and it searches on every field of the table.

The API now returns filtered data.

#### Design

Given the fact that tailwind was already set up, I added my favorite UI library [Shadcn](https://ui.shadcn.com/)

This allows me to quickly have styled buttons and tables.

Made the site responsive using a list view on mobile, and a table for desktop, and copied Solace's svg logo, font and primary color.

### Future development if given more time

If given more time, the first thing to do is to add a search index to the table in the database, because searching with `ilike` even in one column requires a full scan which is a terrible performance.

This index can be implemented using a `tsvector` column, that can have all searchable data, and kept up to date with a trigger that runs on updates. Then to query that index, we can use the `to_tsquery` function.

One last thing that can be done with a little more time, is to debounce the calls to the API so the request is made only after the user finish typing.
