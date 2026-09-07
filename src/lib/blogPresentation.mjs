function normalizedStatement(value) {
  return String(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/^\s*(?:[-*+] |\d+\. |#{1,6} )/, "")
    .replace(/[*_`]/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "")
    .trim()
    .toLowerCase();
}

// Remove only complete repeated statements. Unique facts and different amounts stay visible.
export function supplementalBlogContent(data) {
  const fields = { problem: data.problem, stakes: data.stakes, system: data.system, metrics: data.metrics };
  if (!data.bodySections) return fields;
  if (data.bodyOnly) return { problem: "", stakes: [], system: [], metrics: [] };

  const statements = new Set();
  for (const line of String(data.body || "").split(/\r?\n/)) {
    statements.add(normalizedStatement(line));
    for (const sentence of line.split(/(?<=[.!?])\s+(?=[A-Z])/)) {
      statements.add(normalizedStatement(sentence));
    }
  }
  const isRepeated = (value) => statements.has(normalizedStatement(value));
  return {
    problem: isRepeated(data.problem) ? "" : data.problem,
    stakes: data.stakes.filter((value) => !isRepeated(value)),
    system: data.system.filter((value) => !isRepeated(value)),
    metrics: data.metrics.filter((value) => !isRepeated(value)),
  };
}
