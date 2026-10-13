import crypto from "node:crypto";

export function buildFrontmatter(name: string, color: string): string {
  const id = crypto.randomUUID();

  const frontmatter = `
    ---

    id: ${id}
    name: ${name}
    color: ${color}

    ---
    `;

  return frontmatter;
}
