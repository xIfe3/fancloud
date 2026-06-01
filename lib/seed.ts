import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { events } from "./schema";
import { seedEvents } from "./seed-data";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const pool = new Pool({ connectionString: url });
const db = drizzle(pool);

async function main() {
  // Upsert on slug — re-running brings existing rows in line with seed-data
  // while leaving user-created events untouched.
  await db
    .insert(events)
    .values(seedEvents)
    .onConflictDoUpdate({
      target: events.slug,
      set: {
        title: sql`excluded.title`,
        city: sql`excluded.city`,
        venue: sql`excluded.venue`,
        country: sql`excluded.country`,
        startDate: sql`excluded.start_date`,
        endDate: sql`excluded.end_date`,
        category: sql`excluded.category`,
        color: sql`excluded.color`,
        heroImage: sql`excluded.hero_image`,
        attendance: sql`excluded.attendance`,
        description: sql`excluded.description`,
        ticketUrl: sql`excluded.ticket_url`,
        featured: sql`excluded.featured`,
        status: sql`excluded.status`,
      },
    });

  console.log(`Upserted ${seedEvents.length} seed events.`);
}

main()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err);
    await pool.end();
    process.exit(1);
  });
