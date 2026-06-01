import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: npm run admin:hash <password>");
  process.exit(1);
}

bcrypt
  .hash(password, 12)
  .then((hash) => {
    // We store the hash base64-encoded because Next.js's env loader does
    // variable expansion on `$VAR` patterns and corrupts raw bcrypt hashes
    // (which look like `$2b$12$...`). Quoting and escaping don't help —
    // base64 sidesteps the issue entirely.
    const encoded = Buffer.from(hash).toString("base64");
    console.log("\nADMIN_PASSWORD_HASH=" + encoded);
    console.log(
      "\nCopy that line into .env.local (it's base64-encoded — our auth code\ndecodes it at runtime), then restart `npm run dev`.\n",
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
