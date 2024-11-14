export const tokenize = (input: string) =>
  input
    .split(/\b/)
    .map((i) => i.trim())
    .filter((i) => i);
