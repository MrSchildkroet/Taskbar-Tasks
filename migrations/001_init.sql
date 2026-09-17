CREATE TABLE tasks (
    id          TEXT PRIMARY KEY,
    project     TEXT,
    title       TEXT NOT NULL,
    file_path   TEXT NOT NULL,
    line_start  INTEGER NOT NULL,
    line_end    INTEGER NOT NULL
);