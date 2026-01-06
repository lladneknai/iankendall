/**
 * TECH CONFIGURATION
 * ------------------
 * Canonical list of technologies used across the application
 * Used for: tech icons, filters, validation
 */

export const TECH_OPTIONS = [
  { key: "react", label: "React" },
  { key: "node", label: "Node.js" },
  { key: "ts", label: "TypeScript" },
  { key: "js", label: "JavaScript" },
  { key: "python", label: "Python" },
  { key: "php", label: "PHP" },
  { key: "css", label: "CSS" },
  { key: "scss", label: "SCSS" },
  { key: "sql", label: "SQL" },
  { key: "mysql", label: "MySQL" },
  { key: "mongo", label: "MongoDB" },
  { key: "redis", label: "Redis" },
  { key: "aws", label: "AWS" },
  { key: "figma", label: "Figma" },
  { key: "bash", label: "Bash" },
  { key: "mui", label: "Material UI" },
  { key: "nest", label: "NestJS" },
] as const;

export type TechKey = (typeof TECH_OPTIONS)[number]["key"];

// Helper to get tech option by key
export function getTechOption(key: string) {
  return TECH_OPTIONS.find((opt) => opt.key === key);
}

// Helper to get all tech keys
export function getAllTechKeys(): string[] {
  return TECH_OPTIONS.map((opt) => opt.key);
}
