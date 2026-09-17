import Database from "better-sqlite3";
import { app } from "electron";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

let db: Database.Database;

export function initDb(): Database.Database {
  const dbPath = join(app.getPath("userData"), "app.db");

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  runMigrations();

  return db;
}

export function getDb(): Database.Database {
  if (!db) throw new Error("DB not initialized. initDb() first.");
  return db;
}

function runMigrations() {
  db.exec(`CREATE TABLE IF NOT EXISTS _migrations (
    name TEXT PRIMARY KEY,
    applied_at INTEGER NOT NULL
  )`);

  const applied = new Set(
    db
      .prepare("SELECT name FROM _migrations")
      .all()
      .map((r: any) => r.name),
  );

  const dir = join(__dirname, "../../../migrations");
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const insert = db.prepare(
    "INSERT INTO _migrations (name, applied_at) VALUES (?, ?)",
  );
  const migrate = db.transaction(() => {
    for (const file of files) {
      if (applied.has(file)) continue;
      db.exec(readFileSync(join(dir, file), "utf-8"));
      insert.run(file, Date.now());
    }
  });
  migrate();
}
